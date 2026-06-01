"use client";

import { BlurFade } from "shared-ui";

interface SectionProps {
  id: string;
  title: string;
  description: string;
  className?: string;
}

export function Section({ id, title, description, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`flex min-h-screen items-center justify-center px-6 ${className ?? ""}`}
    >
      <div className="max-w-2xl text-center">
        <BlurFade delay={0.1} inView>
          <h2 className="mb-6 text-4xl font-light tracking-wide text-gray-900">
            {title}
          </h2>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <p className="text-lg leading-relaxed text-gray-600">
            {description}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
