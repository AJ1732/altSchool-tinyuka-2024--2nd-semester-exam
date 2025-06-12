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

export default function TodoFilterControls({ onSearch, value, onChange }) {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <div className="space-y-6">
      <header>
        <h3 className="font-semibold">Todo List Controls</h3>
        <p className="text-muted-foreground text-sm">
          Search and filter your todos: enter a keyword to narrow results or
          choose a status (All, Complete, Incomplete).
        </p>
      </header>
      <hr />

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
          <DrawerDescription>
            Search and filter your todos: enter a keyword to narrow results or
            choose a status (All, Complete, Incomplete).
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 px-4 pt-0 pb-8">
          <hr />

          <SearchTodoForm onSearch={onSearch} />

          <hr />

          <StatusTodoToggleGroup {...{ value, onChange }} />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
