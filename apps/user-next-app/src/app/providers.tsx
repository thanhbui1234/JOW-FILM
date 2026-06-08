"use client";

import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { TopLoadingBarProvider } from "@/components/TopLoadingBarProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Suspense>
        <TopLoadingBarProvider>{children}</TopLoadingBarProvider>
      </Suspense>
    </ThemeProvider>
  );
}
