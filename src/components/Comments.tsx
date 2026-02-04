import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { updateCommentSchema, type Comment, type UpdateComment } from "@/type/comments";
import { createComment, getComments } from "@/services/comment";
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

  const updateMethod = useForm<UpdateComment>({
    resolver: zodResolver(updateCommentSchema),
  });
  const onUpdateComment: SubmitHandler<{ id: string; formData: { contents: string } }> = async ({ formData, id }: { id: string; formData: { contents: string } }) => {
    const newData: UpdateComment = {
      id,
      ...formData,
      todo_id: todoId,
    };
    const payload = await createComment(newData);
    if (payload.ok) {
    } else {
      console.log(payload);
    }
  };

  return (
    <>
      <ul className="grid gap-3">
        {Array.isArray(commentsData) &&
          commentsData.map((item) => (
            <FormProvider {...updateMethod}>
              <CommentItem data={item} onUpdate={onUpdateComment} />
            </FormProvider>
          ))}
      </ul>
    </>
  );
};

export default Comments;
