import { type ApiResponse } from "@/lib/api";
import { type DeleteComment, type InsertComment, type Comment, type UpdateComment } from "@/type/comments";
import type { CommentCountWidhTodos } from "@/type/comments";
import { supabase } from "@/util/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

const TABLE_NAME = "comments";

export async function createComment(data: InsertComment) {
  const payload = await supabase.from(TABLE_NAME).insert(data).select().single();
  if (payload.error) return { ok: false, error: payload.error, message: "エラーが起きました" };
  return { data: payload.data };
}
export async function deleteComment({ id }: DeleteComment) {
  const payload = await supabase.from(TABLE_NAME).delete().eq("id", id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { data: payload.data };
}
export async function updateComment(data: UpdateComment) {
  const payload = await supabase.from(TABLE_NAME).update({ contents: data.contents }).eq("id", data.id).eq("todo_id", data.todo_id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { data: payload.data };
}
export async function getComments(id: Comment["todo_id"]): ApiResponse<Comment[] | PostgrestError> {
  const payload = await supabase.from(TABLE_NAME).select().eq("todo_id", id);
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function getCommentsCountWithTasks(ids: string[]): ApiResponse<CommentCountWidhTodos | PostgrestError> {
  // Supabase JS v2 does not have `.group()`, so we do aggregate with `.select` instead.
  // "count:id" gives count for all, so use "todo_id" and get the count in code.
  const payload = await supabase.from(TABLE_NAME).select("todo_id", { count: "exact", head: false }).in("todo_id", ids);

  if (payload.error) {
    return {
      ok: false,
      error: payload.error,
    };
  }

  // Aggregate the counts by todo_id in JavaScript
  const counts: CommentCountWidhTodos = {};
  (payload.data as { todo_id: string }[]).forEach((item) => {
    if (!item.todo_id) return;
    counts[item.todo_id] = (counts[item.todo_id] ?? 0) + 1;
  });

  return {
    ok: true,
    data: counts,
  };
}

/**
 * APIの型をしっかりと意識しないといけない。
 * Posgreからのエラー、またエラー文を返すのか、メッセージには通常の文章でいいのか。
 * Posgre（Supabase）とバリデーション用のエラーを変える。というよりReact Hook Formのエラーはバリデーションだから不要か。
 * 実際に必要なエラーはglobalErrorのみだな。supabaseから返ってくる。
 * */

// 型定義をしっかり考え直そう・
