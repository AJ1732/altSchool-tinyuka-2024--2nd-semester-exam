import { Github } from "lucide-react";

import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { Head } from "@unhead/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const currentUrl = useCurrentUrl();

  return (
    <>
      <Head>
        <title>TODOS - JSONplaceholder Todo Application</title>
        <meta
          name="description"
          content="A comprehensive Todo application built using React that showcases API integration, modern patterns, routing, and accessible UI."
        />
        <meta
          name="keywords"
          content="todo app, react, task management, productivity, javascript, typescript, tanstack router, shadcn ui"
        />

        {/* Open Graph */}
        <meta property="og:title" content="TODOS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:description"
          content="A comprehensive Todo application built using React"
        />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TODOS" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TODOS" />
        <meta
          name="twitter:description"
          content="A comprehensive Todo application built using React"
        />
        <meta
          name="twitter:image"
          content="https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png"
        />

        <link rel="canonical" href={currentUrl} />
      </Head>
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
        <section>
          <Button asChild className="w-fit">
            <Link
              target="_blank"
              to="https://github.com/AJ1732/altSchool-tinyuka-2024--2nd-semester-exam"
            >
              <Github /> Checkout Source Code
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
