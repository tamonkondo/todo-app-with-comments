import { type ReactNode } from "react";
import Comments from "./Comments";
import type { Todo } from "@/type/todo";
interface Props {
  todoId: Todo["id"];
  commentBottomRender: ReactNode;
}
const CommentsContainer = ({ todoId, commentBottomRender }: Props) => {
  return (
    <>
      <Comments todoId={todoId} />
      <hr className="mt-4" />
      <div className="grid place-items-center mt-4">{commentBottomRender}</div>
    </>
  );
};

export default CommentsContainer;
