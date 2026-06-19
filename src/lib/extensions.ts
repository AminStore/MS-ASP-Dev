/**
 * Extension Error Suppression
 * Suppresses harmless errors from browser extensions (Redux DevTools, React DevTools, etc.)
 * that try to communicate with non-existent content scripts.
 */

const EXTENSION_ERROR_PATTERNS = [
  "Receiving end does not exist",
  "Could not establish connection",
  "message port closed",
  "useCache"
];

const EXTENSION_LOG_PATTERNS = [
  "[ExtensionPerf]",
  "[ChromePolyfill]",
  "Content Script",
  "Initializing",
  "JSHeapSnapshot",
  "Content loaded",
  "Unchecked runtime.lastError"
];

export const isExtensionError = (str: string): boolean => {
  const msg = String(str).toLowerCase();
  return EXTENSION_ERROR_PATTERNS.some(pattern => 
    msg.includes(pattern.toLowerCase())
  );
};

const isExtensionLog = (str: string): boolean => {
  return EXTENSION_LOG_PATTERNS.some(pattern => str.includes(pattern));
};

const isThreeDeprecationWarning = (str: string): boolean => {
  return str.includes("THREE.Clock") || 
         str.includes("THREE.Timer") ||
         str.includes("deprecated");
};

/**
 * Initialize extension error suppression
 * Must be called early in the app lifecycle, before user code executes
 */
export const initializeExtensionErrorSuppression = (): void => {
  if (typeof window === "undefined") return;

  // Override chrome.runtime.lastError handling
  if (typeof (window as any).chrome !== "undefined" && (window as any).chrome?.runtime) {
    try {
      Object.defineProperty((window as any).chrome.runtime, "lastError", {
        get() {
          return null;
        },
        set() {
          // Suppress
        },
        configurable: true,
      });
    } catch {
      // If override fails, silently continue
    }
  }

  // Intercept addEventListener for error/unhandledrejection events
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(
    this: Window,
    type: string,
    listener?: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    if (type === "error" || type === "unhandledrejection") {
      const wrappedListener = function(this: any, event: any) {
        const message = event.message || event.reason?.message || String(event);
        if (isExtensionError(message)) {
          event.preventDefault?.();
          return;
        }
        if (typeof listener === "function") {
          return listener.call(this, event);
        } else if (listener && typeof listener === "object" && "handleEvent" in listener) {
          return listener.handleEvent(event);
        }
      };
      return originalAddEventListener.call(this, type, wrappedListener, options) as any;
    }
    if (typeof listener === "function" || (listener && typeof listener === "object")) {
      return originalAddEventListener.call(this, type, listener, options) as any;
    }
  } as any;

  // Suppress unhandledrejection events from extensions
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason);
    
    if (isExtensionError(message)) {
      event.preventDefault();
    }
  });

  // Suppress error events from extensions (capture phase)
  window.addEventListener("error", (event) => {
    const message = event.message || String(event);
    
    if (isExtensionError(message)) {
      event.preventDefault();
      return true;
    }
  }, true);

  // Intercept console methods
  const originalError = console.error;
  console.error = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isExtensionError(message)) {
      originalError.apply(console, args);
    }
  } as any;

  const originalWarn = console.warn;
  console.warn = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isExtensionError(message) && !isThreeDeprecationWarning(message)) {
      originalWarn.apply(console, args);
    }
  } as any;

  const originalLog = console.log;
  console.log = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isExtensionLog(message)) {
      originalLog.apply(console, args);
    }
  } as any;

  const originalInfo = console.info;
  console.info = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isThreeDeprecationWarning(message)) {
      originalInfo.apply(console, args);
    }
  } as any;
};
