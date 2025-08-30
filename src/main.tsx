import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createHead, UnheadProvider } from "@unhead/react/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const head = createHead();

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UnheadProvider>
  </StrictMode>,
);
