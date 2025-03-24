"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseProvider>{children}</SupabaseProvider>
    </ThemeProvider>
  );
} 