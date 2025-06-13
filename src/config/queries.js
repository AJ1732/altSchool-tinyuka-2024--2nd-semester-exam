import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteTodo,
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

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }) => {
      const response = await updateTodoStatus(id, completed);
      toast.promise(updateTodoStatus(id, completed), {
        loading: `Updating todo ${id} Status...`,
        success: () => `You updated the  Todo ${id} Status`,
        error: (err) => `Failed to update Todo ${id} Status: ${err.message}`,
      });
      return response;
    },
    onSuccess: (updatedTodo) => {
      // Update specific todo in cache
      queryClient.setQueryData(["todo", updatedTodo.id], updatedTodo);

      // Invalidate todos list to refetch and update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      console.log("Updated Todo:", updatedTodo);
    },
    onError: (error) => {
      console.error("Toggle todo status error:", error);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await deleteTodo(id);
      toast.promise(deleteTodo(id), {
        loading: `Deleting todo ${id}...`,
        success: () => `You deleted Todo ${id}`,
        error: (err) => `Failed to delete Todo ${id}: ${err.message}`,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate todos list to refetch and update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Toggle todo status error:", error);
    },
  });
};

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
