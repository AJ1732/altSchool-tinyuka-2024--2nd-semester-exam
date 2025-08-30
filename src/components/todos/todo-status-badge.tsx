import { useState } from "react";

import { useUpdateTodo } from "@/config/queries";
import { cn } from "@/lib/utils";

export default function TodoStatusBadge({ id, completed }) {
  const [newCompleted, setNewCompleted] = useState(completed);
  const { mutate: updateTodo, isPending } = useUpdateTodo();

  const handleToggle = () => {
    updateTodo(
      { id, completed: !newCompleted },
      {
        onSuccess: (updatedTodo) => setNewCompleted(updatedTodo.completed),
      },
    );
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "mt-auto size-fit cursor-pointer rounded-full border px-4 py-2 text-xs font-normal whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50",
        newCompleted
          ? "bg-emerald-100/70 text-emerald-500"
          : "bg-red-50 text-red-500",
      )}
    >
      {isPending ? "Updating..." : newCompleted ? "Completed" : "Not Completed"}
    </button>
  );
}
