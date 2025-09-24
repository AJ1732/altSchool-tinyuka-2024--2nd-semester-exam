"use client";
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

export function AddTodoFormDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription className={"text-pretty"}>
            Fill out the fields below to create a new task, including title, due
            date, priority, and any notes.
          </DialogDescription>
        </DialogHeader>

        <AddTodoFormContent onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
