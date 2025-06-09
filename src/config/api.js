import axios from '@/lib/axios';

export const fetchTodos = async () => {
  const response = await axios.get('/todos');
  return response.data;
};