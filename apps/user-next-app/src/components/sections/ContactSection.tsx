"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Highlighter } from "shared-ui";

interface FormState {
  name: string;
  email: string;
  date: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", date: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formRef, formVisible] = useScrollAnimation({ threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
      <section
        id="contact"
        data-header-theme="light"
        className="relative bg-stone-100 px-5 py-20 md:px-12 lg:px-24 dark:bg-stone-900"
      >
        <div className="mx-auto max-w-6xl">
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className="mb-12 text-center md:mb-16"
            style={{
              transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
              opacity: headerVisible ? 1 : 0,
              transition:
                "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
            }}
          >
            <BlurFade delay={0.05} inView>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                Contact Us
              </p>
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <h2
                className="text-5xl font-light tracking-wide text-stone-900 md:text-6xl dark:text-white"
              >
                Begin your legacy{" "}
                <Highlighter action="underline" color="#d97706" strokeWidth={2} animationDuration={800} isView>
                  <em className="not-italic font-normal italic">with us</em>
                </Highlighter>
              </h2>
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                Tell us about your special day and we&apos;ll craft a cinematic
                story that lasts forever.
              </p>
            </BlurFade>
          </div>

          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="mx-auto max-w-2xl"
            style={{
              transform: formVisible ? "translateY(0)" : "translateY(40px)",
              opacity: formVisible ? 1 : 0,
              transition:
                "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 800ms ease",
            }}
          >
            {submitted ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-10 text-center dark:border-stone-700 dark:bg-stone-800/50 dark:backdrop-blur-sm">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
                  <svg
                    className="h-7 w-7 text-amber-600 dark:text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-light text-stone-900 dark:text-white">
                  Message Received
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm md:p-8 dark:border-stone-700 dark:bg-stone-800/50 dark:shadow-none dark:backdrop-blur-sm"
              >
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <FormField
                    label="Your Name"
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Email"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <FormField
                    label="Wedding Date"
                    id="contact-date"
                    name="date"
                    type="date"
                    placeholder=""
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400"
                  >
                    Tell us about your day
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Share your vision, venue, and any special moments..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-700/50 dark:text-white dark:placeholder-stone-500"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className="w-full rounded-xl bg-amber-500 py-3.5 text-sm font-medium uppercase tracking-widest text-stone-900 transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FormField({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-700/50 dark:text-white dark:placeholder-stone-500"
      />
    </div>
  );
}
