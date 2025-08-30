import { Link } from "@tanstack/react-router";

import { Button } from "../ui/button";

interface ErrorBoundaryProps {
  error?: Error | null;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div role="alert" className="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
      <section className="overflow-break-word flex size-full flex-col justify-between gap-4 rounded-lg bg-red-50 p-4">
        <h2 className="text-xl leading-[150%] md:text-2xl lg:text-3xl">
          Something went wrong
        </h2>
        <h1 className="mx-auto max-w-full bg-red-500 px-4 py-1 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {error?.message || "Unknown error"}
        </h1>

        <div className="ml-auto flex flex-wrap gap-4">
          <Button
            onClick={reset}
            className={"h-14 w-fit px-8 text-xl"}
            size={"lg"}
          >
            Retry Request
          </Button>
          <Button
            asChild
            className={"h-14 w-fit px-8 text-xl hover:border"}
            variant={"ghost"}
            size={"lg"}
          >
            <Link to={"/"}>Let&apos;s go Home</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
