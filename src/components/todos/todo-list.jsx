import { TodoCard } from "@/components/todos";
import { useTodos } from "@/config/queries";

export default function TodoList() {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) return <p>Error loading todos.</p>;

  return (
    <ul className="no-scrollbar lg:y-gradient w-full overflow-y-auto pb-4 max-lg:mb-10 max-lg:pt-0 lg:max-h-[calc(100svh-8rem)] lg:py-12">
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
