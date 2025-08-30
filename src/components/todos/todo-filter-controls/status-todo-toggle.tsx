import { toast } from "sonner";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "incomplete", label: "Incomplete" },
];

interface StatusTodoToggleGroupProps {
  value: TodoStatus;
  onChange: (newValue: TodoStatus) => void;
}

export function StatusTodoToggleGroup({
  value,
  onChange,
}: StatusTodoToggleGroupProps) {
  const handleValueChange = (newValue: TodoStatus) => {
    if (!newValue) return;
    if (typeof onChange === "function") {
      onChange(newValue);
    }
    toast(`Showing ${newValue.toUpperCase()} todos`);
  };

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={handleValueChange}
      aria-label="Filter todos"
      className={"w-full"}
    >
      {STATUS_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          aria-label={`Show ${option.label} todos`}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
