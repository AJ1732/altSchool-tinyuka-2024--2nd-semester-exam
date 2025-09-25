import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 text-neutral-800">
      {/* Hero Section */}
      <header className="max-w-xl space-y-4">
        <h1 className="text-4xl font-black">
          TODO<span className="text-avocado-500">S</span>
        </h1>
        <p className="text-lg">
          A comprehensive Todo application using React that showcases API
          integration, modern patterns, routing, and accessible UI.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size={"lg"} asChild>
            <Link href="/todos">View Todos</Link>
          </Button>
          <Button size={"lg"} asChild variant={"outline"}>
            <Link href="/error-test">Test Error Page</Link>
          </Button>
          <Button size={"lg"} asChild variant={"destructive"}>
            <Link href="/alt">Test Not Found Page</Link>
          </Button>
        </div>
      </header>

      {/* Technical Requirements */}
      <section
        aria-labelledby="tech-req-heading"
        className="w-full max-w-xl space-y-4"
      >
        <article className="space-y-3">
          <h3 className="text-xl font-medium">Core Technologies</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <strong>NextJS 15</strong> with functional components and hooks
            </li>
            <li>
              UI Library <strong>Shadcn UI</strong> to speed up development
            </li>
            <li>
              Database integration with{" "}
              <strong>
                <Link href={"https://supabase.com/"}>Supabase</Link>
              </strong>{" "}
              and <strong>TanStack Query</strong>
            </li>
            <li>
              Styling with <strong>Tailwind CSS</strong>
            </li>
          </ul>
        </article>
      </section>

      <Button asChild className="w-fit">
        <Link
          target="_blank"
          href="https://github.com/AJ1732/altSchool-tinyuka-2024--2nd-semester-exam/tree/nextjs"
        >
          <Github /> Checkout Source Code
        </Link>
      </Button>
    </div>
  );
}
