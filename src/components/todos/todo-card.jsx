import { Trash2 } from "lucide-react";

import { Link } from "@tanstack/react-router";

import {
  useDeleteTodo,
  useToggleTodoStatus,
  useUserName,
} from "@/config/queries";
import { cn } from "@/lib/utils";

import { Checkbox } from "../ui/checkbox";

export default function TodoCard({
  id = 1,
  title = "Complete Todo",
  userId = "1",
  completed = false,
}) {
  const { data: userName, isLoading } = useUserName(userId);
  const { mutate: toggleStatus, isPending: pendingStatus } =
    useToggleTodoStatus();
  const { mutate: deleteTodo, isPending: pendingDelete } = useDeleteTodo();

  const handleToggle = () => toggleStatus({ id, completed: !completed });
  const handleDelete = () => deleteTodo({ id });

  return (
    <li className="hover:bg-avocado-200/50 group relative flex items-center border-zinc-200 last:border-b-0 md:border-b last:[&>*]:border-b-0">
      <div className="mx-auto grid w-full grid-cols-[1.25rem_minmax(10rem,_1fr)_1.125rem] items-center gap-y-4 border-zinc-200 px-2 py-4 max-md:border-b md:max-w-xl lg:grid-cols-[1.25rem_minmax(15rem,_1fr)_minmax(8rem,_12rem)_2rem] lg:gap-x-4 lg:pl-4">
        <Checkbox
          checked={completed}
          onCheckedChange={handleToggle}
          disabled={pendingStatus}
          className={cn("max-lg:-mb-1", pendingStatus && "bg-avocado-300")}
        />

        {/* TASK */}
        <label
          htmlFor={`todo-${id}`}
          className="font-outfit cursor-pointer font-medium max-lg:pl-4 sm:max-lg:px-4 lg:mt-0.5 lg:pr-4"
        >
          <Link to={`/todos/${id}`} className="hover:text-avocado-600">
            {title}
          </Link>
        </label>

        {/* USERNAME */}
        <p className="text-sm font-light max-lg:col-start-2 max-lg:row-start-2 max-lg:-mt-2 max-lg:pl-4">
          for {isLoading ? <span>Loading...</span> : <i>{userName}</i>}
        </p>

        <div className="flex h-full flex-col justify-between max-lg:row-span-2 max-lg:pt-2 lg:justify-center">
          {/* STATUS INDICATOR */}
          <div
            aria-hidden="true"
            className={cn(
              "size-2 self-center rounded-full transition-transform duration-500 lg:group-focus-within:-translate-x-8 lg:group-hover:-translate-x-8",
              completed ? "bg-emerald-500" : "bg-red-400",
            )}
          />

          {/* MOBILE BUTTON */}
          <button
            onClick={handleDelete}
            disabled={pendingDelete}
            className="cursor-pointer rounded disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
          >
            <Trash2 className="size-[1.125rem] stroke-red-500/80" />
          </button>
        </div>
      </div>

      {/* DESKTOP BUTTON */}
      <button
        onClick={handleDelete}
        disabled={pendingDelete}
        className={cn(
          "pointer-events-none absolute right-2 -z-[1] grid size-8 cursor-pointer place-content-center rounded-full bg-red-50 opacity-0 transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50 max-lg:hidden",
          "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:z-0 group-hover:opacity-100",
        )}
      >
        <Trash2 className="size-4 stroke-red-500" />
      </button>
    </li>
  );
}
