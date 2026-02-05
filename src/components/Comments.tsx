import { type Comment } from "@/type/comments";
import { getComments } from "@/services/comment";
import { useEffect, useState } from "react";
import type { PostgrestError } from "@supabase/supabase-js";
import CommentItem from "./CommentItem";

interface Props {
  todoId: string;
}

const Comments = ({ todoId }: Props) => {
  const [commentsData, setCommentsData] = useState<Comment[] | PostgrestError>();

  useEffect(() => {
    const fetchComments = async () => {
      const payload = await getComments(todoId);
      if (payload.ok) {
        setCommentsData(payload.data);
      }
    };
    fetchComments();
  }, []);

  return (
    <>
      <ul className="grid gap-3">{Array.isArray(commentsData) && commentsData.map((item) => <CommentItem data={item} todoId={todoId} />)}</ul>
    </>
  );
};

export default Comments;
