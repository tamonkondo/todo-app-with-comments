import type { Todo } from "@/type/todo";
import z from "zod";

export const commentSchema = z.object({
  id: z.uuid(),
  todo_id: z.uuid(),
  contents: z.string().max(100, "文字は100文字までです。"),
  updated_at: z.string(),
  created_at: z.string(),
});
export const createCommentSchema = commentSchema.pick({
  contents: true,
});
export const insertCommentSchema = commentSchema.pick({
  todo_id: true,
  contents: true,
});
export const deleteCommentSchema = commentSchema.pick({
  id: true,
  todo_id: true,
});

export const updateCommentFormSchema = commentSchema.pick({
  contents: true,
});
export const updateCommentSchema = commentSchema.pick({
  id: true,
  contents: true,
  todo_id: true,
});

export type CreateComment = z.infer<typeof createCommentSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type DeleteComment = z.infer<typeof deleteCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
export type UpdateCommentForm = z.infer<typeof updateCommentFormSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type CommentCountWidhTodos = Record<Todo["id"], number>;
