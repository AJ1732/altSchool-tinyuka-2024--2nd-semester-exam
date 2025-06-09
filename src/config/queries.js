import { useQuery } from "@tanstack/react-query";

import { fetchTodoID, fetchTodos, fetchUserName } from "./api";

export const useTodos = (page, limit) => {
  return useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, limit),
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
