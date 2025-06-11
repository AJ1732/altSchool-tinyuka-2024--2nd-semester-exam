import { Toaster } from "sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Footer } from "@/components/layout";
import { ErrorBoundary, NotFound } from "@/components/shared";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
        <div className="bg-neutral-background/60 size-full rounded-lg p-4">
          <Outlet />
        </div>
      </main>

      <Footer />
      <Toaster closeButton position="top-right" />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});
