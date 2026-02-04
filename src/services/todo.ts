import { createApiResult, type ApiResponse } from "@/lib/api";
import { type CreateTodo, type DeleteTodo, type InsertTodo, type Todo, type UpdateTodo } from "@/type/todo";
import { supabase } from "@/util/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

const TABLE_NAME = "todos";

export async function createTodo(data: InsertTodo) {
  const payload = await supabase.from(TABLE_NAME).insert(data).select().single();
  if (payload.error) return createApiResult({ ok: false, data: payload.error, message: "エラーが起きました" });
  return createApiResult({ data: payload.data, message: "新しくタスクを作成しました" });
}
export async function deleteTodo({ id }: DeleteTodo) {
  const payload = await supabase.from(TABLE_NAME).delete().eq("id", id).single();
  if (payload.error) return createApiResult({ ok: false, data: payload.error, message: payload.error.code, status: 500 });
  return createApiResult({ data: payload.data, message: "タスクを削除しました" });
}
export async function updateTodo(data: UpdateTodo) {
  const payload = await supabase.from(TABLE_NAME).update(data).eq("id", data.id).single();
  if (payload.error) return createApiResult({ ok: false, data: payload.error, message: payload.error.code, status: 500 });
  return createApiResult({ data: payload.data, message: "タスクを更新しました" });
}
export async function getTodo(id: Todo["id"]) {
  const payload = await supabase.from(TABLE_NAME).select().eq("id", id).single();
  if (payload.error) return createApiResult({ ok: false, data: payload.error, message: payload.error.code, status: 500 });
  return createApiResult({ data: payload.data, message: "タスクを取得できました" });
}
export async function getTodos(): ApiResponse<Todo[] | PostgrestError> {
  const payload = await supabase.from(TABLE_NAME).select();
  if (payload.error) return createApiResult({ ok: false, data: payload.error, message: payload.error.code, status: 500 });
  return createApiResult({ data: payload.data, message: "タスク一覧を取得しました" });
}

/**
 * APIの型をしっかりと意識しないといけない。
 * Posgreからのエラー、またエラー文を返すのか、メッセージには通常の文章でいいのか。
 * Posgre（Supabase）とバリデーション用のエラーを変える。というよりReact Hook Formのエラーはバリデーションだから不要か。
 * 実際に必要なエラーはglobalErrorのみだな。supabaseから返ってくる。
 * */
