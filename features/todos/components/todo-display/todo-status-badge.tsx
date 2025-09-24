import { cn } from "@/lib/utils";

import { useUpdateTodo } from "../../queries";

export function TodoStatusBadge({
  id,
  completed,
}: Pick<Todo, "id" | "completed">) {
  const { mutateAsync: updateTodo, isPending } = useUpdateTodo();

  const handleToggle = async () =>
    await updateTodo({ id, values: { completed: !completed } });

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "mt-auto size-fit cursor-pointer rounded-full border px-4 py-2 text-xs font-normal whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50",
        completed
          ? "bg-emerald-100/70 text-emerald-500"
          : "bg-red-50 text-red-500",
      )}
    >
      {isPending ? "Updating..." : completed ? "Completed" : "Not Completed"}
    </button>
  );
}
