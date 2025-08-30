import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export default function BrandMark({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-4 text-xs", className)}>
      <i className="font-light">Engineered by</i>

      <Link
        to={"https://ejemeniboi.com/"}
        target="_blank"
        className="group flex w-fit items-center justify-center gap-1 pr-1 text-xs tracking-tight"
      >
        <span className="bg-avocado-500 text-background relative z-10 -skew-x-12 rounded-xs px-1.5 py-2 font-medium">
          <span className="inline-block skew-x-12 leading-0">17</span>
        </span>
        <span className="-ml-2 -skew-x-12 rounded-r py-2 pr-2 pl-2">
          <span className="inline-block skew-x-12">32</span>
        </span>
      </Link>
    </p>
  );
}
