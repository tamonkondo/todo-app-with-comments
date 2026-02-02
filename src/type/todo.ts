import z from "zod";

export const todoStatusSchema = z.enum(["TODO", "PROGRESS", "DONE"]);
export const todoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional().nullable(),
  date: z.iso
    .datetime()
    .transform((v) => new Date(v))
    .optional(),
  status: todoStatusSchema,
});
export const createTodoSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  date: z.iso.datetime().transform((v) => new Date(v)),
});
export const updateTodoSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  status: todoStatusSchema,
  date: z.iso
    .datetime()
    .transform((v) => new Date(v))
    .optional(),
});
export const deleteTodoSchema = z.object({
  id: z.uuid(),
});

export type TodoStatus = z.infer<typeof todoStatusSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodo = z.input<typeof createTodoSchema>;
export type UpdateTodo = z.input<typeof updateTodoSchema>;
export type DeleteTodo = z.input<typeof deleteTodoSchema>;
