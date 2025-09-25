import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddTodoFormTrigger, TodoList } from "@/features/todos/components";

export default function TodosPage() {
  return (
    <div className="relative grid h-full grid-rows-[auto_1fr] max-lg:gap-4 lg:grid-cols-[24rem_1fr]">
      <section className="flex h-fit gap-2 max-lg:items-center lg:flex-col lg:justify-between lg:space-y-4 lg:px-4 lg:pt-4 lg:pb-24">
        <header className="flex-1">
          <h1 className="text-3xl max-lg:ml-6 max-lg:text-center md:text-5xl lg:text-6xl">
            Your <br className="max-lg:hidden" /> Todo List
            <span className="text-avocado-500">.</span>
          </h1>
        </header>
        <AddTodoFormTrigger>
          <Button className="size-fit gap-1 !pr-4 !pl-5 max-lg:ml-auto max-lg:!px-2">
            <span className="max-lg:sr-only">Add Todo</span>
            <Plus className="size-5" />
          </Button>
        </AddTodoFormTrigger>
      </section>
      <TodoList />
    </div>
  );
}
