import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchTodos,
  fetchTodoById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../services";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTodoById = (id: number) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodoById(id),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodoData: TodoInput) => {
      const promise = addTodo(newTodoData);
      toast.promise(promise, {
        loading: `Adding new todo...`,
        success: () => `Successfully added Todo!`,
        error: (err) => `Failed to add todo: ${err.message}`,
      });

      const created = await promise;
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Add todo error:", error);
    },
  });
};

export const useUpdateTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: Partial<Todo>;
    }) => {
      const promise = updateTodo(id, values);
      toast.promise(promise, {
        loading: "Updating todo...",
        success: "Todo updated",
        error: (err) =>
          `Failed to update todo: ${String((err as Error)?.message ?? err)}`,
      });
      const updated = await promise;
      return updated;
    },

    // optimistic update
    onMutate: async ({ id, values }) => {
      await qc.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = qc.getQueryData<Todo[] | undefined>(["todos"]);
      const previousTodo = qc.getQueryData<Todo | undefined>(["todo", id]);

      // apply optimistic patch to list
      qc.setQueryData<Todo[] | undefined>(["todos"], (old = []) => {
        if (!old) return old;
        return old.map((t) =>
          t.id === id ? ({ ...t, ...values } as Todo) : t,
        );
      });

      // apply optimistic patch to single item cache
      if (previousTodo) {
        qc.setQueryData(["todo", id], { ...previousTodo, ...values } as Todo);
      }

      return { previousTodos, previousTodo };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previousTodos) {
        qc.setQueryData(["todos"], context.previousTodos);
      }
      if (context?.previousTodo) {
        qc.setQueryData(
          ["todo", context.previousTodo.id],
          context.previousTodo,
        );
      }
    },

    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const promise = deleteTodo(id);
      toast.promise(promise, {
        loading: "Deleting todo...",
        success: "Todo deleted successfully!",
        error: (err) => `Failed to delete todo: ${err.message}`,
      });

      const status = await promise;
      return status;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Delete todo error:", error);
    },
  });
};
