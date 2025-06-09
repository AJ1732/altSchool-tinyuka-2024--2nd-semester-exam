import { Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { TodoList, TodoSkeleton } from "@/components/todos";
import { useTodos } from "@/config/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: todos, isLoading, isError } = useTodos();

  if (isError) return <p>Error loading todos.</p>;

  return (
    <section className="relative grid lg:grid-cols-[24rem_1fr]">
      <div className="flex h-fit justify-between gap-2 py-6 pt-4 md:flex-col md:space-y-4">
        <header>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            Users <br className="max-lg:hidden" /> Todo List
            <span className="text-avocado-500">.</span>
          </h1>
        </header>

        <Button className="size-fit gap-1 max-lg:px-3">
          <span className="max-lg:sr-only">Add Todo</span>
          <Plus className="size-5" />
        </Button>
      </div>

      <div
        className={cn(
          "grid max-h-[calc(100svh-11rem)] px-6 max-lg:px-0 md:max-h-[calc(100svh-16rem)] lg:min-h-[calc(100svh-8rem)]",
          !isLoading && "lg:place-content-center",
        )}
      >
        {isLoading ? (
          <TodoSkeleton />
        ) : (
          <>
            {/* TODO LIST */}
            <TodoList todos={todos} />

            <div className="mx-auto w-full max-w-[calc(100%-6rem)] rounded-full border border-zinc-100 bg-zinc-100/90 p-4 py-2 backdrop-blur-sm lg:absolute lg:bottom-6 lg:left-6 lg:max-w-80">
              Pagination
            </div>
          </>
        )}
      </div>
    </section>
  );
}
