import { TodoCard } from "@/components/todos";

export default function TodoList({ todos }) {
  return (
    <ul className="no-scrollbar y-gradient w-full overflow-y-auto pb-4 max-lg:mb-4 max-lg:pt-0 lg:max-h-[calc(100svh-8rem)] lg:py-12">
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
