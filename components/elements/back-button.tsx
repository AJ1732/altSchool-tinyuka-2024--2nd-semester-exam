"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return;

  return (
    <section className="content-grid mt-4">
      <Button size={"icon"} onClick={() => router.back()}>
        <ChevronLeft />
      </Button>
    </section>
  );
}
