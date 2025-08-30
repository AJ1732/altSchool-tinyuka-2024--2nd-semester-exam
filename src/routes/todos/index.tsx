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
import { useCurrentUrl } from "@/hooks/use-current-url";
import { Head } from "@unhead/react";

export const Route = createFileRoute("/todos/")({
  loader: ({ context: { queryClient } }) => {
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
  const currentUrl = useCurrentUrl();

  // STATUS TOGGLE
  const [statusValue, setStatusValue] = useState<TodoStatus>("all");
  const completedParam = mapStatusValueToCompleted(statusValue);

  // SEARCH QUERY
  const [searchTerm, setSearchTerm] = useState("");

  // To reset back to page 1 when filter occurs
  useEffect(() => setPage(1), [statusValue, searchTerm]);

  const { data, isLoading, error, isFetching } = useTodos(
    page,
    limit,
    searchTerm,
    completedParam,
  );

  // if (error) throw new Error(error);
  if (error) {
    if (error instanceof Error) throw error;
    throw new Error(String(error));
  }

  const todos = data?.todos || [];
  const totalCount = data?.totalCount;
  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 1;

  // Dynamic page title and description based on current filters
  const getPageTitle = () => {
    if (searchTerm) {
      return `Search: "${searchTerm}" - Todo List | TODOS`;
    }
    if (statusValue !== "all") {
      return `${statusValue.charAt(0).toUpperCase() + statusValue.slice(1)} Tasks - Todo List | TODOS`;
    }
    return `Todo List - JSONplaceholder | TODOS`;
  };

  const getPageDescription = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}" in your todo list. ${totalCount || 0} tasks found. Manage and organize your tasks efficiently.`;
    }
    if (statusValue !== "all") {
      return `View all ${statusValue} tasks in your todo list. ${totalCount || 0} ${statusValue} tasks available. Stay productive and organized.`;
    }
    return `Manage your todo list with ${totalCount || 0} tasks. Add, edit, and organize your tasks efficiently. Stay productive and on track.`;
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta
          name="keywords"
          content={`todo list, task management, productivity, ${statusValue} tasks, ${searchTerm ? `${searchTerm}, ` : ""}organize tasks, todo app`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:description" content={getPageDescription()} />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TODOS - Todo List Management" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta
          name="twitter:image"
          content="https://cdn.sanity.io/media-libraries/mlu3DBU0QaKb/images/00a07e5ad65f27b4fa4d8a8c672c32ba214e54e4-512x512.png"
        />

        <link rel="canonical" href={currentUrl} />
      </Head>
      <section className="relative grid h-full grid-rows-[auto_1fr] max-lg:gap-4 lg:grid-cols-[24rem_1fr]">
        <div className="flex h-fit justify-between gap-2 max-lg:items-center lg:flex-col lg:space-y-4 lg:px-4 lg:pt-4 lg:pb-24">
          <header>
            <h1 className="text-3xl md:text-5xl lg:text-6xl">
              Users <br className="max-lg:hidden" /> Todo List
              <span className="text-avocado-500">.</span>
            </h1>
          </header>

          <AddTodoFormTrigger>
            <Button className="size-fit gap-1 !px-6 max-lg:ml-auto max-lg:!px-2">
              <span className="max-lg:sr-only">Add Todo</span>
              <Plus className="size-5" />
            </Button>
          </AddTodoFormTrigger>

          <TodoFilterControls
            value={statusValue}
            onChange={(newVal: TodoStatus) => setStatusValue(newVal)}
            onSearch={(term: string) => setSearchTerm(term)}
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
    </>
  );
}
