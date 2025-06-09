import { useState } from "react";
import { Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { TodoList, TodoPagination, TodoSkeleton } from "@/components/todos";
import { useTodos } from "@/config/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const limit = 10;
  const totalPages = 20;
  const [page, setPage] = useState(1);

  const { data: todos, isLoading, isError, isFetching } = useTodos(page, limit);

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
          "grid max-h-[calc(100svh-11rem)] overflow-y-auto px-6 max-lg:px-0 md:max-h-[calc(100svh-16rem)] lg:min-h-[calc(100svh-8rem)]",
          !isLoading && "lg:place-content-center",
        )}
      >
        {isLoading ? (
          <TodoSkeleton />
        ) : (
          <>
            {/* TODO LIST */}
            <TodoList todos={todos} />
            {/* TODO PAGINATION */}
            <TodoPagination {...{ page, totalPages, isFetching, setPage }} />
          </>
        )}
      </div>
    </section>
  );
}
