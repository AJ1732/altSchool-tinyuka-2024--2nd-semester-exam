import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 text-neutral-800">
      {/* Hero Section */}
      <header className="max-w-xl space-y-4">
        <h1 className="text-4xl font-black">
          TODO<span className="text-avocado-500">S</span>
        </h1>
        <p className="text-lg" s>
          A comprehensive Todo application using React that showcases API
          integration, modern patterns, routing, and accessible UI.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size={"lg"} asChild>
            <Link to="/todos">View Todos</Link>
          </Button>
          <Button size={"lg"} asChild variant={"outline"}>
            <Link to="/error">Test Error Page</Link>
          </Button>
          <Button size={"lg"} asChild variant={"destructive"}>
            <Link to="/alt">Test Not Found Page</Link>
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
              <strong>React 19+</strong> with functional components and hooks
            </li>
            <li>
              UI Library <strong>Shadcn UI</strong> to speed up development
            </li>
            <li>
              <strong>TanStack Router</strong> for routing/navigation
            </li>
            <li>
              API Integration of{" "}
              <strong>
                <Link to={"https://jsonplaceholder.typicode.com"}>
                  JSONplaceholder
                </Link>
              </strong>{" "}
              todos with <strong>Axios</strong> and{" "}
              <strong>TanStack Query</strong>
            </li>
            <li>
              Styling with <strong>Tailwind CSS</strong>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
