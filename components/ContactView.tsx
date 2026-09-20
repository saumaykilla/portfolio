"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/ui";
import { TechIcon } from "@/components/TechIcon";
import { CornerBlob, Handwritten, SparkDoodle } from "@/components/Decor";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactView() {
  const { contact, site } = content;
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    const body = `From: ${values.name} <${values.email}>\n\n${values.message}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div id="contact" className="relative scroll-mt-[72px]">
      <div className="relative overflow-hidden">
        <CornerBlob className="pointer-events-none absolute -bottom-10 -right-16 h-[340px] w-[420px] text-terracotta sm:h-[420px] sm:w-[520px]" />
        <SparkDoodle className="pointer-events-none absolute bottom-36 right-[18%] hidden h-6 w-6 sm:block" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <PageHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <ul className="mt-10 space-y-5">
            {site.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-terracotta shadow-[0_8px_20px_rgba(28,22,18,0.06)] transition group-hover:bg-terracotta group-hover:text-white">
                    <TechIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.name}</span>
                    <span className="block text-sm text-muted">
                      {item.href.replace(/^mailto:/, "").replace(/^https?:\/\//, "")}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[24px] border border-ink/6 bg-white p-5 shadow-[0_16px_40px_rgba(28,22,18,0.05)] sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <p className="font-display text-2xl font-semibold text-ink">
                  {contact.successTitle}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {contact.successMessage}
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 inline-block text-sm font-medium text-terracotta"
                >
                  {site.email}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {contact.fields.map((field) => {
                  const error = errors[field.name];
                  const shared = register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    pattern:
                      field.type === "email"
                        ? {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          }
                        : undefined,
                    minLength:
                      field.name === "message"
                        ? { value: 12, message: "Tell me a little more" }
                        : undefined,
                  });

                  return (
                    <label key={field.name} className="block">
                      <span className="mb-1.5 block text-sm font-medium text-ink">
                        {field.label}
                      </span>
                      {field.type === "textarea" ? (
                        <textarea
                          {...shared}
                          rows={5}
                          placeholder={field.placeholder}
                          className={cn(
                            "w-full resize-y rounded-2xl border bg-cream/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-terracotta focus:bg-white",
                            error ? "border-terracotta" : "border-ink/10",
                          )}
                        />
                      ) : (
                        <input
                          {...shared}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={cn(
                            "w-full rounded-2xl border bg-cream/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-terracotta focus:bg-white",
                            error ? "border-terracotta" : "border-ink/10",
                          )}
                        />
                      )}
                      {error ? (
                        <span className="mt-1 block text-xs text-terracotta">
                          {error.message}
                        </span>
                      ) : null}
                    </label>
                  );
                })}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-terracotta py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(196,90,56,0.28)] transition hover:bg-terracotta-dark disabled:opacity-70"
                >
                  {contact.submitLabel}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8 sm:pb-12">
        <Handwritten className="text-ink! rotate-[-6deg]">{contact.handwritten}</Handwritten>
      </div>
    </div>
  );
}
