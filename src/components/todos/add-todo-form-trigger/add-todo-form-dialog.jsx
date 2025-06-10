import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddTodoFormContent } from "./add-todo-form-content";

export function AddTodoFormDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className={""}>
          <DialogTitle>Add New Todo Item</DialogTitle>
          <DialogDescription>
            Fill out the fields below to create a new task, including title, due
            date, priority, and any notes.
          </DialogDescription>
        </DialogHeader>

        <AddTodoFormContent onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
