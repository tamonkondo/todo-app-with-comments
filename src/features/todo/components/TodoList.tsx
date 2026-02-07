import TodoCard from "./TodoCard";

import type { Todo } from "@/type/todo";
interface Props {
  data: Todo[];
}
const TodoList = ({ data }: Props) => {
  if (data.length === 0 || !data) {
    return <p>データがありません。</p>;
  }
  return (
    <div className="mt-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {data.map((item) => (
        <TodoCard data={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoList;
