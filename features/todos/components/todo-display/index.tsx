"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { useTodoById } from "@/features/todos/queries";

import { TodoIDTitle } from "./todo-id-title";
import { TodoStatusBadge } from "./todo-status-badge";

interface TodoDisplayProps {
  id: number;
}

export default function TodoDisplay({ id }: TodoDisplayProps) {
  const { data: todo, isLoading } = useTodoById(id);

  if (isLoading) return <p>Loading...</p>;
  if (!todo) return <p>No Todo</p>;

  const { title, description, completed } = todo;

  return (
    <>
      <div className="h-full space-y-12 max-md:grid max-md:grid-rows-[auto_1fr]">
        <header className="relative flex justify-between gap-4 max-md:flex-col">
          <div className="flex w-full flex-col lg:max-w-3/5">
            <span className="text-avocado-600 font-contrail-one max-md:mb-4">
              {id}
            </span>

            <TodoIDTitle {...{ id, todo, title }} />

            <p className="mt-2 flex items-center gap-2 text-sm font-extralight first-letter:capitalize sm:text-base md:text-2xl lg:mt-1">
              <span
                aria-hidden
                className="bg-avocado-600 size-2 rounded-full"
              />
              {description}
            </p>

            <Link
              href={"/todos"}
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
    </>
  );
}
