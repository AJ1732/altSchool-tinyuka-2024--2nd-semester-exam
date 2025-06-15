import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHead, UnheadProvider } from '@unhead/react/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Create head component
const head = createHead()

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a Query client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UnheadProvider>
  </StrictMode>,
);
