import { supabase } from "@/supabase/client";

// fetch all todos
export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

// fetch single todo by id
export async function fetchTodoById(id: number): Promise<Todo | null> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116" /* not found */) return null;
    throw error;
  }
  return data;
}

// create a todo
export async function addTodo(values: Partial<Todo>): Promise<number> {
  const { status, error } = await supabase
    .from("todos")
    .insert(values)
    .single();
  if (error) throw error;
  return status;
}

// update a todo
export async function updateTodo(
  id: number,
  values: Partial<Todo>,
): Promise<number> {
  const { data, error } = await supabase
    .from("todos")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// delete a todo
export async function deleteTodo(id: number): Promise<number> {
  const { status, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw error;
  return status;
}
