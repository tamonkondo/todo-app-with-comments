import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { type Todo } from "@/type/todo";
import { getTodos } from "@/services/todo";
import type { PostgrestError } from "@supabase/supabase-js";
import CreateTodoForm from "@/components/CreateTodoForm";
import TodoList from "@/components/TodoList";
/**
 * タスクの種類
 *
 * */

const HomePageLayout = () => {
  const [todosData, setTodosData] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const payload = await getTodos();
      if (payload.ok) {
        setTodosData(payload.data);
      }
    };
    fetchTodos();
  }, []);

  const onAddTaskAfterCreateTask = (data: Todo) => {
    setTodosData((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, data];
      }
      return [data];
    });
  };

  return (
    <>
      <TypographyH1 className="text-center">Top Page</TypographyH1>
      {/* タスク入力 */}
      <CreateTodoForm setAddTask={onAddTaskAfterCreateTask} />
      <TypographyH2 className="mt-4">Tasks</TypographyH2>
      {Array.isArray(todosData) && <TodoList data={todosData} />}
      {/* タスク表示 */}
      <Outlet />
    </>
  );
};

export default HomePageLayout;
