import { useEffect, useState } from "react";
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
import { fetchUsers } from "@/config/api";
import { cn } from "@/lib/utils";
import { mapStatusValueToCompleted } from "@/utils";

export const Route = createFileRoute("/todos/")({
  loader: ({ context: { queryClient } }) => {
      // console.log('Context:', context) // Debug what's available
    console.log('QueryClient:', queryClient) 
    return queryClient.ensureQueryData({
      queryKey: ["users"],
      queryFn: fetchUsers,
      staleTime: 1000 * 60 * 10,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const limit = 10;
  const [page, setPage] = useState(1);

  // STATUS TOGGLE
  const [statusValue, setStatusValue] = useState("all");
  const completedParam = mapStatusValueToCompleted(statusValue);

  // SEARCH QUERY
  const [searchTerm, setSearchTerm] = useState("");

  // To reset back to page 1 when filter occurs
  useEffect(() => {
    setPage(1);
  }, [statusValue, searchTerm]);

  const { data, isLoading, error, isFetching } = useTodos(
    page,
    limit,
    completedParam,
    searchTerm,
  );

  if (error) throw new Error(error);

  const todos = data?.todos || [];
  const totalCount = data?.totalCount;

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 1;
  return (
    <section className="relative grid h-full grid-rows-[auto_1fr] max-lg:gap-4 lg:grid-cols-[24rem_1fr]">
      <div className="flex h-fit justify-between gap-2 max-lg:items-center lg:flex-col lg:space-y-4 lg:px-4 lg:pt-4 lg:pb-24">
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

        <TodoFilterControls
          value={statusValue}
          onChange={(newVal) => setStatusValue(newVal)}
          onSearch={(term) => setSearchTerm(term)}
        />
      </div>

      <div
        className={cn(
          "grid h-full max-h-[calc(100svh-9.5rem)] px-6 max-lg:px-0 md:max-h-[calc(100svh-12rem)] lg:min-h-[calc(100svh-6rem)]",
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
