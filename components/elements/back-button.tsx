"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return;

  return (
    <section className={cn("content-grid h-10 mt-4 -mb-2", className)}>
      <Button size={"icon"} onClick={() => router.back()}>
        <ChevronLeft />
      </Button>
    </section>
  );
}
