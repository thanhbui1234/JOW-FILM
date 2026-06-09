"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

interface LoadingBarContextType {
  start: () => void;
  complete: () => void;
}

const LoadingBarContext = createContext<LoadingBarContextType>({
  start: () => {},
  complete: () => {},
});

export const useLoadingBar = () => useContext(LoadingBarContext);

export function TopLoadingBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const start = useCallback(() => {
    loadingBarRef.current?.continuousStart();
  }, []);

  const complete = useCallback(() => {
    loadingBarRef.current?.complete();
  }, []);

  useEffect(() => {
    complete();
  }, [pathname, searchParams, complete]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.target === "_blank"
      ) {
        return;
      }

      if (href === pathname) return;

      start();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, start]);

  return (
    <LoadingBarContext.Provider value={{ start, complete }}>
      <LoadingBar
        ref={loadingBarRef}
        color="#d97706"
        height={3}
        shadow={true}
        waitingTime={400}
      />
      {children}
    </LoadingBarContext.Provider>
  );
}
