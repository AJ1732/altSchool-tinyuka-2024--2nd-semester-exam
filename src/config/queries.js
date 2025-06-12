import { useQuery } from "@tanstack/react-query";

import { fetchTodoID, fetchTodos, fetchUserName } from "./api";

/**
 * @param {number} page
 * @param {number} limit
 * @param {boolean|undefined} completed
 * @param {string|undefined} searchTerm
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

export const useTodoID = (todoId) => {
  return useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => fetchTodoID(todoId),
    enabled: !!todoId,
  });
};

export const useUserName = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserName(userId),
    enabled: !!userId,
  });
};
