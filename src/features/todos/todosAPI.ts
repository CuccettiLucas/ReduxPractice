import axios from 'axios';
import type { Todo } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}?_limit=5`);
  return response.data;
};

export const getTask = async (id:number): Promise<Todo> =>{
  const response = await axios.get<Todo>(`${API_URL}/${id}`);
  return response.data;
}

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post<Todo>(API_URL, {
    title,
    completed: false
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<number> => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export const toggleTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/${todo.id}`, {
    ...todo,
    completed: todo.completed
  });
  return response.data;
};
