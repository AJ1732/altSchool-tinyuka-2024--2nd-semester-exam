import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  fetchTodoID,
  fetchTodos,
  fetchUserName,
  updateTodoStatus,
} from "./api";

/**
 * @param {number} page
 * @param {number} limit
 * @param {boolean | undefined} completed
 * @param {string | undefined} searchTerm
 * @returns {Object} { data: { todos, totalCount }, isLoading, error, isFetching, ... }
 */
export const useTodos = (page, limit, completed, searchQuery) => {
  return useQuery({
    queryKey: ["todos", { page, limit, completed, searchQuery }],
    queryFn: () => fetchTodos(page, limit, completed, searchQuery),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * @param {number | string} todoId
 */
export const useTodoID = (todoId) => {
  return useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => fetchTodoID(todoId),
    enabled: !!todoId,
  });
};

export function useToggleTodoStatus() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, completed }) => {
      const newStatus = !completed;
      return updateTodoStatus(id, newStatus);
    },
    {
      onMutate: ({ id }) => {
        toast.loading(`Updating Todo ${id} status...`);
      },
      onSuccess: (updatedTodo, variables) => {
        toast.success(
          `Todo ${updatedTodo.id} marked ${
            updatedTodo.completed ? "completed" : "incomplete"
          }`,
        );
        // Invalidate or refetch the todos list so UI updates:
        queryClient.invalidateQueries(["todos"]);
        queryClient.invalidateQueries(["todo", variables.id]);
      },
      onError: (err, variables) => {
        toast.error(
          `Failed to update Todo ${variables.id} status: ${err.message}`,
        );
      },
    },
  );
}

/**
 * @param {number | string} userId
 */
export const useUserName = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserName(userId),
    enabled: !!userId,
  });
};
