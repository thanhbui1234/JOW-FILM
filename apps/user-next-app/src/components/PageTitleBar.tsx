"use client";

import { BlurFade } from "shared-ui";

interface PageTitleBarProps {
  label: string;
  title: string;
  highlightWord: string;
}

export function PageTitleBar({
  label,
  title,
  highlightWord,
}: PageTitleBarProps) {
  return (
    <section
      data-header-theme="light"
      className="px-6 pb-6 pt-24 md:px-16 md:pb-8 md:pt-28 lg:px-24 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-6xl text-center">
        <BlurFade delay={0.05} inView>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 md:text-xs">
            {label}
          </p>
        </BlurFade>
        <BlurFade delay={0.15} inView>
          <h1
            className="font-title text-3xl font-light tracking-wide text-foreground md:text-5xl lg:text-6xl"
          >
            {title}{" "}
            <em className="italic font-normal">{highlightWord}</em>
          </h1>
        </BlurFade>
      </div>
    </section>
  );
}
