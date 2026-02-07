import type { Todo } from "@/type/todo";
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface TodoContextValue {
  todos: Todo[] | null;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  return <TodoContext value={{ todos, setTodos }}>{children}</TodoContext>;
}

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw Error("Todosでエラーです。");
  return { todos: ctx.todos, setTodos: ctx.setTodos };
};
