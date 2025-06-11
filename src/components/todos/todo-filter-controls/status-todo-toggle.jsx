import { useState } from "react";
import { toast } from "sonner";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "incomplete", label: "Incomplete" },
];

export function StatusTodoToggleGroup({ defaultValue = "all", onChange }) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue) => {
    if (!newValue) return;
    setValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
    }
    toast(`${newValue} todos`);
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
