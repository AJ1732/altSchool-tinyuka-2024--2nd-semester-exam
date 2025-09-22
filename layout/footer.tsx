import Link from "next/link";

import { BrandMark } from "@/components/elements";

export function Footer() {
  return (
    <footer className="content-grid h-12">
      <section className="flex items-center justify-between gap-4 px-2">
        <Link href={"/"} className="text-sm font-black">
          TODO<span className="text-avocado-500">S</span>
        </Link>
        <BrandMark />
      </section>
    </footer>
  );
}
