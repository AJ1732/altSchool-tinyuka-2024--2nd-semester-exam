import axios from "@/lib/axios";

export const fetchTodos = async (page, limit, completed, searchQuery) => {
  try {
    const params = { _page: page, _limit: limit };
    if (completed !== undefined) {
      params.completed = completed;
    }
    if (searchQuery) {
      params.title_like = searchQuery;
    }
    const response = await axios.get("/todos", { params });
    const totalCountHeader = response.headers["x-total-count"];
    const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : null;

    console.log("Total Count:", totalCount);
    return { todos: response.data, totalCount };
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
