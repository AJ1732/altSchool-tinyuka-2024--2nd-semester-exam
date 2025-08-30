import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { AddTodoFormContent } from "./add-todo-form-content";

export function AddTodoFormDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={"p-4 pt-0 sm:p-6 sm:pt-0"}>
        <DrawerHeader>
          <DrawerTitle>Add New Todo Item</DrawerTitle>
          <DrawerDescription className={"text-pretty"}>
            Fill out the fields below to create a new task, including title, due
            date, priority, and any notes.
          </DrawerDescription>
        </DrawerHeader>

        <AddTodoFormContent onClose={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}
