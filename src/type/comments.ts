import z from "zod";
import type { Todo } from "./todo";

export const createCommentSchema = z.object({
  contents: z.string().max(100, "文字は100文字までです。"),
});
export const insertCommentSchema = z.object({
  contents: z.string().max(100, "文字は100文字までです。"),
  todo_id: z.uuid(),
});
export const deleteCommentSchema = z.object({
  id: z.uuid(),
  todo_id: z.uuid(),
});

export const updateCommentFormSchema = z.object({
  contents: z.string().max(100, "文字は100文字までです。"),
});
export const updateCommentSchema = z.object({
  id: z.uuid(),
  contents: z.string().max(100, "文字は100文字までです。"),
  todo_id: z.uuid(),
});

export const commentSchema = z.object({
  id: z.uuid(),
  todo_id: z.uuid(),
  contents: z.string().max(100, "文字は100文字までです。"),
  updated_at: z.string(),
  created_at: z.string(),
});

export type CreateComment = z.infer<typeof createCommentSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type DeleteComment = z.infer<typeof deleteCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
export type UpdateCommentForm = z.infer<typeof updateCommentFormSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type CommentCountWidhTodos = Record<Todo["id"], number>;
