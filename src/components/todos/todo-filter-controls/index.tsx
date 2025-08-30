import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsDesktop } from "@/hooks/use-isdesktop";

import { SearchTodoForm } from "./search-todo-form";
import { StatusTodoToggleGroup } from "./status-todo-toggle";

interface TodoFilterControlsProps {
  value: TodoStatus;
  onChange: (newValue: TodoStatus) => void;
  onSearch: (term: string) => void;
}

export default function TodoFilterControls({
  value,
  onChange,
  onSearch,
}: TodoFilterControlsProps) {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <div className="space-y-6">
      <header>
        <h3 className="font-semibold">Todo List Controls</h3>
        <p className="text-muted-foreground text-sm text-pretty">
          Search and filter your todos: enter a keyword to narrow results or
          choose a status (All, Complete, Incomplete).
        </p>
      </header>
      <SearchTodoForm onSearch={onSearch} />
      <hr />
      <StatusTodoToggleGroup {...{ value, onChange }} />
    </div>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"icon"}>
          <EllipsisVertical />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={"pb-4"}>
        <DrawerHeader>
          <DrawerTitle>Todo List Controls</DrawerTitle>
          <DrawerDescription className={"text-pretty"}>
            Search and filter your todos: enter a keyword to narrow results or
            choose a status (All, Complete, Incomplete).
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 px-4 py-6">
          <SearchTodoForm onSearch={onSearch} />
          <hr className="border-transparent" />
          <StatusTodoToggleGroup {...{ value, onChange }} />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
