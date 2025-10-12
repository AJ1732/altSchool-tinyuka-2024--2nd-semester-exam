"use client";
import { cn } from "@/lib/utils";

import { useTodos } from "../../queries";
import { TodoCard } from "./todo-card";
import { TodoSkeleton } from "./todo-skeleton";

export default function TodoList() {
  const { data: todos, isLoading } = useTodos();

  return (
    <section
      className={cn(
        "grid h-full max-h-[calc(100svh-9.5rem)] px-6 max-lg:px-0 md:max-h-[calc(100svh-12rem)] lg:min-h-[calc(100svh-9.25rem)]",
        !isLoading && "lg:place-content-center",
      )}
    >
      {isLoading ? (
        <TodoSkeleton />
      ) : (
        <ul className="no-scrollbar y-gradient size-full max-h-[calc(100svh-8rem)] overflow-y-auto pb-4 max-lg:mb-4 max-lg:pt-0 lg:max-h-[calc(100svh-8rem)] lg:py-4">
          {todos?.map((todo) => (
            <TodoCard key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </section>
  );
}
