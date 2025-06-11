import axios from "@/lib/axios";

export const fetchTodos = async (page, limit) => {
  try {
    const response = await axios.get("/todos", {
      params: { _page: page, _limit: limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch Todos`);
  }
};

export const fetchTodoID = async (todoId) => {
  try {
    const response = await axios.get(`/todos/${todoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch Todo with id ${todoId}`);
  }
};

export const fetchUserName = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data.name;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch user with id ${userId}`);
  }
};
