import { ChevronLeft } from "lucide-react";

import { createFileRoute, Link } from "@tanstack/react-router";

import { useTodoID, useUserName } from "@/config/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/todos/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: todo, isLoading: todoLoading, error } = useTodoID(id);
  const { data: userName, isLoading: userLoading } = useUserName(todo?.userId);

  if (todoLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { id: todoId, title, completed } = todo;

  return (
    <div className="space-y-8">
      <header className="relative flex justify-between gap-4 max-md:flex-col">
        <div className="flex flex-col">
          <span className="text-avocado-600">{todoId}</span>
          <h1 className="max-w-2xl pr-12 text-3xl text-pretty first-letter:capitalize md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <h3 className="mt-2 flex items-center gap-2 text-sm font-light sm:text-base lg:mt-1 lg:ml-auto">
            <div aria-hidden className="bg-avocado-600 size-2 rounded-full" />
            For {userLoading ? <span>Loading...</span> : <>{userName}</>}
          </h3>
          <Link
            from={`/todos/${id}`}
            to={"/"}
            className="bg-avocado-400 absolute top-0 right-0 flex aspect-square cursor-pointer items-center justify-center rounded-full p-2"
          >
            <ChevronLeft />
          </Link>
        </div>

        <div
          className={cn(
            "mt-auto size-fit rounded-full px-4 py-2 text-xs font-normal",
            completed
              ? "bg-emerald-100/70 text-emerald-500"
              : "bg-red-50 text-red-500",
          )}
        >
          {completed ? "Completed" : "Not Completed"}
        </div>
      </header>
    </div>
  );
}
