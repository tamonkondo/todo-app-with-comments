import type { CommentCountWidhTodos } from "@/type/comments";
import TodoCard from "./TodoCard";
import { getCommentsCountWithTasks } from "@/services/comment";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import type { Todo } from "@/type/todo";
interface Props {
  data: Todo[];
}
const TodoList = ({ data }: Props) => {
  if (data.length === 0 || !data) {
    return <p>データがありません。</p>;
  }
  const [commentsCountData, setCommentsCountData] = useState<CommentCountWidhTodos | PostgrestError>();
  const taskIds = [...data].map((item) => item.id);
  useEffect(() => {
    const fetchComments = async () => {
      const payload = await getCommentsCountWithTasks(taskIds);
      if (payload.ok) {
        setCommentsCountData(payload.data);
      }
    };
    fetchComments();
  }, []);

  return <div className="mt-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">{!Array.isArray(commentsCountData) && data.map((item) => <TodoCard data={item} key={item.id} commentsCount={commentsCountData as CommentCountWidhTodos} />)}</div>;
};

export default TodoList;
