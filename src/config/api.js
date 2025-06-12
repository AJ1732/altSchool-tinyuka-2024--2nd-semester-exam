import axios from "@/lib/axios";

/**
 * @param {number} page
 * @param {number} limit
 * @param {boolean | undefined} completed
 * @param {string | undefined} searchTerm
 */
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

    return { todos: response.data, totalCount };
  } catch (error) {
    console.error("fetchTodos error:", error);
    throw new Error(`Failed to fetch Todos`);
  }
};

/**
 * @param {number | string} id
 */
export const fetchTodoID = async (id) => {
  try {
    const response = await axios.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("fetchTodoID error:", error);
    throw new Error(`Failed to fetch Todo with id ${id}`);
  }
};

/**
 * @param {number | string} id
 */
export const updateTodoStatus = async (id, completed) => {
  try {
    const response = await axios.patch(`/todos/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error("updateTodoStatus error:", error);
    throw new Error(`Failed to update Todo status with id ${id}`);
  }
};

/**
 * @param {number | string} userId
 */
export const fetchUserName = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data.name;
  } catch (error) {
    console.error("fetchUserName error:", error);
    throw new Error(`Failed to fetch user with id ${userId}`);
  }
};
