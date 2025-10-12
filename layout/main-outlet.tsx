"use client";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainOutlet({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main
      className={cn(
        "content-grid mt-4",
        pathname === "/"
          ? "min-h-[calc(100dvh-4rem)]"
          : "min-h-[calc(100dvh-7.5rem)]",
      )}
    >
      <div className="bg-neutral-background/60 size-full rounded-lg border p-4">
        {children}
      </div>
    </main>
  );
}
