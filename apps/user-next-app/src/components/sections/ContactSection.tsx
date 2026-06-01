"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

  const [leftRef, leftVisible] = useScrollAnimation({ threshold: 0.1 });
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
      className="min-h-screen bg-stone-100 px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left info */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          style={{
            transform: leftVisible ? "translateX(0)" : "translateX(-60px)",
            opacity: leftVisible ? 1 : 0,
            transition:
              "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 800ms ease",
          }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            Let&apos;s Connect
          </p>
          <h2 className="mb-8 text-5xl font-light leading-tight tracking-wide text-stone-900 md:text-6xl">
            Book your <br />
            <em className="font-extralight italic">wedding film</em>
          </h2>
          <p className="mb-10 text-base leading-relaxed text-stone-500">
            Tell us about your special day and we&apos;ll craft a cinematic
            story that lasts forever. We&apos;d love to be part of your
            journey.
          </p>

          {/* Contact details */}
          <div className="space-y-6">
            <ContactInfo
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              }
              label="Email"
              value="hello@jowfilm.vn"
            />
            <ContactInfo
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              }
              label="Phone"
              value="+84 90 000 0000"
            />
            <ContactInfo
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              }
              label="Studio"
              value="TP. Hồ Chí Minh, Việt Nam"
            />
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef as React.RefObject<HTMLDivElement>}
          style={{
            transform: formVisible ? "translateX(0)" : "translateX(60px)",
            opacity: formVisible ? 1 : 0,
            transition:
              "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94) 150ms, opacity 800ms ease 150ms",
          }}
        >
          {submitted ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <svg
                  className="h-8 w-8 text-amber-600"
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
              <h3 className="mb-3 text-2xl font-light text-stone-900">
                Message Received
              </h3>
              <p className="text-stone-500">
                Thank you! We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-8 shadow-sm md:p-10"
            >
              <div className="mb-5 grid gap-5 md:grid-cols-2">
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

              <div className="mb-5">
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

              <div className="mb-7">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-500"
                >
                  Tell us about your day
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Share your vision, venue, and any special moments you'd love us to capture..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="w-full rounded-xl bg-stone-900 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98]"
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

function ContactInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-stone-200">
        <svg className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-stone-400">{label}</p>
        <p className="text-sm font-medium text-stone-800">{value}</p>
      </div>
    </div>
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
        className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-500"
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
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
    </div>
  );
}
