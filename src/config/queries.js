import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addTodo,
  deleteTodo,
  fetchTodoID,
  fetchTodos,
  fetchUserName,
  fetchUsers,
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

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodoData) => {
      toast.promise(addTodo(newTodoData), {
        loading: `Adding new todo...`,
        success: (response) => `Successfully added Todo "${response.title}"!`,
        error: (err) => `Failed to add todo: ${err.message}`,
      });

      return await addTodo(newTodoData);
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todo", newTodo.id], newTodo);

      // Update all todos list caches to include the new todo
      queryClient.setQueriesData({ queryKey: ["todos"] }, (oldData) => {
        if (!oldData || !Array.isArray(oldData.todos)) {
          return oldData;
        }
        const updatedTodos = [newTodo, ...oldData.todos];

        return {
          ...oldData,
          todos: updatedTodos,
          totalCount: oldData.totalCount
            ? oldData.totalCount + 1
            : oldData.totalCount,
        };
      });

      console.log("Added Todo:", newTodo);
    },
    onError: (error) => {
      console.error("Add todo error:", error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      toast.promise(updateTodo(updatedData), {
        loading: `Updating todo ${updatedData.id}...`, // the loading toast laggs
        success: (response) => {
          const updatedFields = [];
          if (updatedData.title !== undefined) updatedFields.push("title");
          if (updatedData.completed !== undefined) updatedFields.push("status");

          return `Successfully updated Todo ${response.id} ${updatedFields.join(" and ")}!`;
        },
        error: (err) =>
          `Failed to update Todo ${updatedData.id}: ${err.message}`,
      });

      const response = await updateTodo(updatedData);
      return response;
    },
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(["todo", updatedTodo.id], updatedTodo);
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Update todo error:", error);
    },
  });
};

export const useDeleteTodo = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      toast.promise(deleteTodo(id), {
        loading: `Deleting todo ${id}...`,
        success: () => `You deleted Todo ${id}`,
        error: (err) => `Failed to delete Todo ${id}: ${err.message}`,
      });
      await deleteTodo(id);
      return id;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Toggle todo status error:", error);
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
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
