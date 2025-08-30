type Todo = {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
};

type TodosResponse = {
  todos: Todo[];
  totalCount?: number;
};

type TodoStatus = "complete" | "incomplete" | "all";

type TodoInput = {
  title: string;
  userId: number;
};

type UpdateTodoInput = Partial<Pick<Todo, "title" | "completed">> & {
  id: number;
};

interface TodoQueryParams {
  _page: number;
  _limit: number;
  completed?: boolean;
  title_like?: string;
}
