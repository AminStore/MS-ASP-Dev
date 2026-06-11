import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Mail } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { submitContact } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});
type FormData = z.infer<typeof schema>;

export function Contact() {
  const t = useT();
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await send({ data });
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.contact.eyebrow} title={t.contact.title} />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t.contact.lede}
          </p>
          <div className="mt-10 space-y-3 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t.contact.direct}
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 font-display text-2xl underline decoration-border underline-offset-4 transition hover:decoration-foreground"
            >
              <Mail className="size-5" />
              hello@example.com
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:col-span-7"
          noValidate
        >
          <Field label={t.contact.name} error={errors.name?.message}>
            <input
              {...register("name")}
              type="text"
              autoComplete="name"
              className="w-full border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-foreground"
            />
          </Field>
          <Field label={t.contact.email} error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              className="w-full border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-foreground"
            />
          </Field>
          <Field label={t.contact.message} error={errors.message?.message}>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-foreground"
            />
          </Field>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-50"
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
              <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
            {status === "sent" && (
              <p className="text-sm text-muted-foreground">{t.contact.sent}</p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">{t.contact.error}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}