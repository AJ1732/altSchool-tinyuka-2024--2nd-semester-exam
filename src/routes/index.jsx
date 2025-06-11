import { useState } from "react";
import { Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  AddTodoFormTrigger,
  TodoList,
  TodoPagination,
  TodoSkeleton,
  TodoFilterControls,
} from "@/components/todos";
import { useTodos } from "@/config/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const limit = 10;
  const totalPages = 20;
  const [page, setPage] = useState(1);

  const { data: todos, isLoading, error, isFetching } = useTodos(page, limit);

  if (error) throw new Error(error);

  return (
    <section className="relative grid lg:grid-cols-[24rem_1fr]">
      <div className="flex h-fit justify-between gap-2 py-6 pt-4 max-lg:items-center lg:flex-col lg:space-y-4 lg:px-4">
        <header>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            Users <br className="max-lg:hidden" /> Todo List
            <span className="text-avocado-500">.</span>
          </h1>
        </header>

        <AddTodoFormTrigger>
          <Button className="size-fit gap-1 max-lg:ml-auto max-lg:!px-2">
            <span className="max-lg:sr-only">Add Todo</span>
            <Plus className="size-5" />
          </Button>
        </AddTodoFormTrigger>

        <TodoFilterControls />
      </div>

      <div
        className={cn(
          "grid max-h-[calc(100svh-11rem)] px-6 max-lg:px-0 md:max-h-[calc(100svh-12rem)] lg:min-h-[calc(100svh-6rem)]",
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
