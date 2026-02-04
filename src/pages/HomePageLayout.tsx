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
  const [todosData, setTodosData] = useState<Todo[] | PostgrestError>();

  useEffect(() => {
    const fetchTodos = async () => {
      const payload = await getTodos();
      // 必要であればsetTodosData(payload)などの処理を追加してください
      if (payload.ok) {
        setTodosData(payload.data);
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      <TypographyH1 className="text-center">Top Page</TypographyH1>
      {/* タスク入力 */}
      <CreateTodoForm />
      <TypographyH2 className="mt-4">Tasks</TypographyH2>
      {Array.isArray(todosData) && <TodoList data={todosData} />}
      {/* タスク表示 */}
      <Outlet />
    </>
  );
};

export default HomePageLayout;
