import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, FONTS, GRIDS, BORDERS, COMPONENTS } from "@/styles/theme";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});
type FormData = z.infer<typeof schema>;

export function Contact() {
  const t = useT();
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
      console.log("Form submitted:", data);
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.contact.eyebrow} title={t.contact.title} />

      <div className={GRIDS.sectionLayout}>
        <div className="md:col-span-5">
          <p className={`max-w-md ${FONTS.bodyXl} ${COLORS.textMuted}`}>
            {t.contact.lede}
          </p>
          <div className="mt-10 space-y-3">
            <p className={`${FONTS.labelMd} ${COLORS.textMuted}`}>{t.contact.direct}</p>
            <a
              href="mailto:m.ssaid356@gmail.com"
              className={`inline-flex items-center gap-2 ${FONTS.displaySm} underline decoration-border underline-offset-4 transition hover:decoration-foreground`}
            >
              <Mail className="size-5" />
              m.ssaid356@gmail.com
            </a>
          </div>
          <div className="mt-6 space-y-2">
            <a
              href="tel:+201067358073"
              className={`inline-flex items-center gap-2 ${FONTS.displaySm} ${COLORS.textMuted} hover:${COLORS.textBase} transition`}
            >
              <Phone className="size-5" />
              +201067358073
            </a>
          </div>
        </div>

        <div className={`${BORDERS.rounded2xl} ${BORDERS.borderBase} ${COLORS.bgCard} ${SPACING.cardPadding} backdrop-blur-sm md:col-span-7`}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <Field label={t.contact.name} error={errors.name?.message}>
              <input {...register("name")} type="text" autoComplete="name" className={COMPONENTS.formInput} />
            </Field>
            <Field label={t.contact.email} error={errors.email?.message}>
              <input {...register("email")} type="email" autoComplete="email" className={COMPONENTS.formInput} />
            </Field>
            <Field label={t.contact.message} error={errors.message?.message}>
              <textarea {...register("message")} rows={5} className={`${COMPONENTS.formInput} resize-none`} />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group ${COMPONENTS.buttonPrimary}`}
              >
                {status === "sending" ? t.contact.sending : t.contact.send}
                <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
              {status === "sent" && (
                <p className={`${FONTS.bodySm} ${COLORS.textMuted}`}>{t.contact.sent}</p>
              )}
              {status === "error" && (
                <p className={`${FONTS.bodySm} text-destructive`}>{t.contact.error}</p>
              )}
            </div>
          </form>
        </div>
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
      <span className={COMPONENTS.formLabel}>{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className={COMPONENTS.formError}>{error}</span>}
    </label>
  );
}
