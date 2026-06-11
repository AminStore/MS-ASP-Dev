# CSS Linter Warnings - Expected Tailwind v4 Behavior

## Why You See These Warnings

The warnings in `src/styles.css` are **expected and normal**. They appear because your IDE's CSS linter doesn't recognize Tailwind v4's new at-rules.

## Tailwind v4 At-Rules (All Valid)

### 1. `@import "tailwindcss"`
- **Status**: ✓ Valid Tailwind v4 syntax
- **Purpose**: Imports Tailwind CSS framework
- **Why Warning**: Older CSS parsers don't recognize this directive
- **Build Impact**: None - builds successfully

### 2. `@source`
- **Status**: ✓ Valid Tailwind v4 syntax
- **Purpose**: Specifies where Tailwind should scan for class names
- **Why Warning**: Not part of standard CSS specification
- **Build Impact**: None - required for content detection

### 3. `@custom-variant`
- **Status**: ✓ Valid Tailwind v4 syntax
- **Purpose**: Defines custom CSS variants (like dark mode)
- **Why Warning**: Custom Tailwind directive
- **Build Impact**: None - works as expected

### 4. `@theme`
- **Status**: ✓ Valid Tailwind v4 syntax
- **Purpose**: Configures design tokens and theme values
- **Why Warning**: Custom Tailwind directive
- **Build Impact**: None - correctly applies theme

## Solution Applied

Added `/* stylelint-disable-next-line at-rule-no-unknown */` comments above each unknown directive to suppress linter warnings while keeping valid Tailwind v4 syntax.

## Build & Runtime

✓ **Build**: No errors - builds successfully
✓ **Runtime**: Works perfectly - styles apply correctly
✓ **Warnings**: IDE display only - doesn't affect functionality

## Conclusion

These warnings are **cosmetic only** and don't impact your application. The CSS is valid, Tailwind v4 is working correctly, and your portfolio builds and runs without issues.

If you want to completely remove these warnings, you would need:
- Update your CSS linter to support Tailwind v4 (if available for your IDE)
- Or disable CSS linting for this file
- Or use a newer CSS parser

For now, the suppression comments keep the warnings out of your editor view.
