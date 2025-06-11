import { toast } from "sonner";

import { cn } from "@/lib/utils";

export default function TodoStatusBadge({ id, completed }) {
   // STATUS MUTATION
  function simulateStatusToggle(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) {
          reject(new Error("Network error"));
        } else {
          resolve(id);
        }
      }, 5000);
    });
  }
  function handleStatusToggle() {
    toast.promise(simulateStatusToggle(id), {
      loading: `Updating Todo ${id} Status...`,
      success: () => `Updated Todo ${id} Status`,
      error: (err) => `Failed to update Todo ${id} Status: ${err.message}`,
    });
  }

  return (
    <button
      onClick={handleStatusToggle}
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
