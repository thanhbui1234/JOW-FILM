"use client";

import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { NextQueryProvider } from "shared-api";
import { TopLoadingBarProvider } from "@/components/providers/TopLoadingBarProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextQueryProvider>
        <Suspense>
          <TopLoadingBarProvider>{children}</TopLoadingBarProvider>
        </Suspense>
      </NextQueryProvider>
    </ThemeProvider>
  );
}
