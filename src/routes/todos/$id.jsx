import { ChevronLeft } from "lucide-react";

import { createFileRoute, Link } from "@tanstack/react-router";

import { TodoIDTitle, TodoStatusBadge } from "@/components/todos";
import { useTodoID, useUserName } from "@/config/queries";

export const Route = createFileRoute("/todos/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: todo, isLoading: todoLoading, error } = useTodoID(id);
  const { data: userName, isLoading: userLoading } = useUserName(todo?.userId);

  // Defensive Rendering
  if (todoLoading) return <p>Loading...</p>;
  if (error) throw new Error(error);

  // TODO DATA
  const { id: todoId, title, completed } = todo;

  return (
    <div className="h-full space-y-12 max-md:grid max-md:grid-rows-[auto_1fr]">
      <header className="relative flex justify-between gap-4 max-md:flex-col">
        <div className="flex w-full flex-col lg:max-w-3/5">
          <span className="text-avocado-600 max-md:mb-4">{todoId}</span>

          <TodoIDTitle {...{ id, todo, title }} />

          <h3 className="mt-2 flex items-center gap-2 text-sm font-light sm:text-base lg:mt-1 lg:ml-auto">
            <div aria-hidden className="bg-avocado-600 size-2 rounded-full" />
            For {userLoading ? <span>Loading...</span> : <>{userName}</>}
          </h3>

          <Link
            from={`/todos/${id}`}
            to={"/"}
            className="bg-avocado-400 absolute top-0 right-0 flex aspect-square size-9 cursor-pointer items-center justify-center rounded-full"
          >
            <ChevronLeft />
          </Link>
        </div>

        <TodoStatusBadge {...{ id, completed }} />
      </header>

      <section className="ml-auto flex max-w-md flex-col items-end justify-end gap-1 text-right md:gap-0">
        <h2 className="font-normal md:text-lg">
          Instruction for to-do item page:
        </h2>
        <p className="max-md:text-sm">
          Simply click the <em className="font-normal">Title</em> to edit, and
          tap the <em className="font-normal">Status badge</em> to toggle
          between completed and incomplete status.
        </p>
      </section>
    </div>
  );
}
