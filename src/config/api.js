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
    if (completed !== undefined) params.completed = completed;
    if (searchQuery) params.title_like = searchQuery;

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
 * @param {Object} todoData
 * @param {string} todoData.title
 * @param {number} todoData.userId
 */
export const addTodo = async ({ title, userId = 1 }) => {
  try {
    const response = await axios.post("/todos", {
      title,
      userId,
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error("addTodo error:", error);
    throw new Error(`Failed to add Todo`);
  }
};

/**
 * @param {number | string} id
 * @param {boolean} completed
 */
export const updateTodo = async ({ id, title, completed }) => {
  const body = {};
  if (title !== undefined) body.title = title;
  if (completed !== undefined) body.completed = completed;

  try {
    const response = await axios.patch(`/todos/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("updateTodoStatus error:", error);
    throw new Error(`Failed to update Todo status with id ${id}`);
  }
};

/**
 * @param {number | string} id
 */
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteTodo error:", error);
    throw new Error(`Failed to delete Todo with id ${id}`);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error("fetchTodos error:", error);
    throw new Error(`Failed to fetch Todos`);
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
