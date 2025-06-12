// import { useToggleTodoStatus } from "@/config/queries";
import { cn } from "@/lib/utils";

export default function TodoStatusBadge({
  // id,
  completed,
}) {
  // const { mutate: toggleStatus, isPending } = useToggleTodoStatus();
  // const handleToggleStatus = () => toggleStatus({ id, completed });

  return (
    <button
      // disabled={isPending}
      // onClick={handleToggleStatus}
      className={cn(
        "mt-auto size-fit cursor-pointer rounded-full px-4 py-2 text-xs font-normal whitespace-nowrap",
        completed
          ? "bg-emerald-100/70 text-emerald-500"
          : "bg-red-50 text-red-500",
      )}
    >
      {completed ? "Completed" : "Not Completed"}
    </button>
  );
}
