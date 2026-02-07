import { memo } from "react";

import CommentItem from "./CommentItem";
import type { Comment } from "../types/comments";

interface Props {
  data: Comment[];
  todoId: string;
}

const Comments = memo(({ data, todoId }: Props) => {
  if (data.length === 0 || !data) {
    return <p>データがありません。</p>;
  }
  return (
    <>
      <ul className="grid gap-3">
        {data.map((item) => (
          <CommentItem data={item} key={item.id} todoId={todoId} />
        ))}
      </ul>
    </>
  );
});

export default Comments;
