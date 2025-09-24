type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
};

type TodosResponse = {
  todos: Todo[];
  totalCount?: number;
};

type TodoStatus = "complete" | "incomplete" | "all";

type TodoInput = Partial<Pick<Todo, "title" | "description">>;
