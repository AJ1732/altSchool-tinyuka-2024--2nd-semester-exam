import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Footer } from "@/components/layout";
import { NotFound } from "@/components/shared";

export const Route = createRootRoute({
  component: () => (
    <div>
      <main className="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
        <div className="bg-neutral-background/60 size-full rounded-lg p-4">
          <Outlet />
        </div>
      </main>

      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
  notFoundComponent: () => {
    return <NotFound />;
  },
});
