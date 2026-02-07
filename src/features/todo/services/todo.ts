import { type ApiResponse } from "@/lib/api";
import { type DeleteTodo, type InsertTodo, type Todo, type UpdateTodo, type UpdateTodoForm, type UpdateTodoStatus } from "@/type/todo";
import { supabase } from "@/util/supabase";

const TABLE_NAME = "todos";

export async function createTodo(data: InsertTodo): ApiResponse<Todo> {
  const payload = await supabase.from(TABLE_NAME).insert(data).select().single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function deleteTodo({ id }: DeleteTodo): ApiResponse<never> {
  const payload = await supabase.from(TABLE_NAME).delete().eq("id", id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}

export async function updateTodoStatus(data: UpdateTodoStatus): ApiResponse<Todo> {
  const payload = await supabase.from(TABLE_NAME).update({ status: data.status }).eq("id", data.id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function updateTodo(data: UpdateTodo): ApiResponse<Todo> {
  const payload = await supabase.from(TABLE_NAME).update(data).eq("id", data.id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function getTodo(id: Todo["id"]): ApiResponse<Todo> {
  const payload = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function getTodos(): ApiResponse<Todo[]> {
  const payload = await supabase.from(TABLE_NAME).select();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}

/* mapper or usecaseに将来移行させたほうがよさそうなもの */
export async function getTodoForUpdateForm(id: string): Promise<UpdateTodoForm> {
  const defaultValues: UpdateTodoForm = {
    title: "",
    status: "TODO",
    contents: "",
    due_date: "",
  };
  if (!id) return defaultValues;
  const payload = await getTodo(id);
  if (payload.ok && "title" in payload.data && "status" in payload.data) {
    return {
      title: payload.data.title,
      status: payload.data.status,
      contents: payload.data.contents ?? "",
      due_date: payload.data.due_date ?? "",
    };
  } else {
    return defaultValues;
  }
}
