import z from "zod";
import type { Database } from "./schema";

type DbTodoStatus = Database["public"]["Enums"]["todos_status"];

// DB enum に合う値だけを並べる（ここが実行時にも使える“実体”）
export const todoStatusValues = ["TODO", "PROGRESS", "COMPLETE"] as const satisfies readonly DbTodoStatus[];

// Zod スキーマ（実行時バリデーション）
export const todoStatusSchema = z.enum(todoStatusValues);

export const todoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional().nullable(),
  due_date: z.string(),
  status: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
});
export const createTodoSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  due_date: z.string().optional(),
});
export const insertTodoSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().optional().nullable(),
  due_date: z.string().optional(),
});
export const updateTodoFormSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  status: todoStatusSchema,
  due_date: z.string().optional(),
});
export const updateTodoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  status: todoStatusSchema,
  due_date: z.string().optional(),
});
export const deleteTodoSchema = z.object({
  id: z.uuid(),
});

export type TodoStatus = z.infer<typeof todoStatusSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.input<typeof updateTodoSchema>;
export type UpdateTodoForm = z.input<typeof updateTodoFormSchema>;
export type DeleteTodo = z.input<typeof deleteTodoSchema>;
