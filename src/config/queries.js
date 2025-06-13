import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteTodo,
  fetchTodoID,
  fetchTodos,
  fetchUserName,
  updateTodo,
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

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      const response = updateTodo(updatedData);
      toast.promise(updateTodo(updatedData), {
        // loading: `Updating todo ${updatedData.id}...`, // the loading toast laggs
        success: (response) => {
          const updatedFields = [];
          if (updatedData.title !== undefined) updatedFields.push("title");
          if (updatedData.completed !== undefined) updatedFields.push("status");

          return `Successfully updated Todo ${response.id} ${updatedFields.join(" and ")}!`;
        },
        error: (err) =>
          `Failed to update Todo ${updatedData.id}: ${err.message}`,
      });
      return response;
    },
    onSuccess: (updatedTodo) => {
      // Update specific todo in cache
      queryClient.setQueryData(["todo", updatedTodo.id], updatedTodo);
      // Invalidate todos list to refetch and update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // console.log("Updated Todo:", updatedTodo);
    },
    onError: (error) => {
      console.error("Update todo error:", error);
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
