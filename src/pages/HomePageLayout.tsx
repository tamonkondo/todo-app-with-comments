import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { type Todo } from "@/type/todo";
import { getTodos } from "@/features/todo/services/todo";
import CreateTodoForm from "@/features/todo/components/CreateTodoForm";
import TodoList from "@/features/todo/components/TodoList";
import { useTodoContext } from "@/features/todo/provider/container";
/**
 * タスクの種類
 *
 * */

const HomePageLayout = () => {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const payload = await getTodos();
      if (payload.ok) {
        setTodos(payload.data);
      }
    };
    fetchTodos();
  }, []);

  const onAddTaskAfterCreateTask = (data: Todo) => {
    setTodos((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, data];
      }
      return [data];
    });
  };

  return (
    <div className="pb-[100px]">
      <TypographyH1 className="text-center">Top Page</TypographyH1>
      {/* タスク入力 */}
      <CreateTodoForm setAddTask={onAddTaskAfterCreateTask} />
      <TypographyH2 className="mt-4">Tasks</TypographyH2>
      {Array.isArray(todos) && <TodoList data={todos} />}
      {/* タスク表示 */}
      <Outlet />
    </div>
  );
};

export default HomePageLayout;
