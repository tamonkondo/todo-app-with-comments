import { type ApiResponse } from "@/lib/api";

import { supabase } from "@/util/supabase";
import type { Comment, CommentCountWidhTodos, DeleteComment, InsertComment, UpdateComment } from "../types/comments";
import type { Todo } from "@/type/todo";

const TABLE_NAME = "comments";

export async function createComment(data: InsertComment): ApiResponse<Comment> {
  const payload = await supabase.from(TABLE_NAME).insert(data).select().single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function deleteComment({ id }: DeleteComment): ApiResponse<Comment> {
  const payload = await supabase.from(TABLE_NAME).delete().eq("id", id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function updateComment(data: UpdateComment): ApiResponse<Comment> {
  const payload = await supabase.from(TABLE_NAME).update({ contents: data.contents }).eq("id", data.id).eq("todo_id", data.todo_id).single();
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function getComments(id: Comment["todo_id"]): ApiResponse<Comment[]> {
  const payload = await supabase.from(TABLE_NAME).select().eq("todo_id", id);
  if (payload.error) return { ok: false, error: payload.error };
  return { ok: true, data: payload.data };
}
export async function getCommentsCountWithTasks(ids: string[]): ApiResponse<CommentCountWidhTodos> {
  const payload = await supabase.from(TABLE_NAME).select("todo_id", { count: "exact", head: false }).in("todo_id", ids);

  if (payload.error) {
    return {
      ok: false,
      error: payload.error,
    };
  }

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

export async function getCommentsCountWithTask(id: Todo["id"]): ApiResponse<number> {
  const payload = await supabase.from(TABLE_NAME).select("todo_id", { count: "exact", head: false }).eq("todo_id", id);

  if (payload.error) {
    return {
      ok: false,
      error: payload.error,
    };
  }

  return {
    ok: true,
    data: payload.count || 0,
  };
}
