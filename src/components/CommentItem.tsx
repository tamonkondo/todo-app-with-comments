import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { updateCommentFormSchema, type Comment, type UpdateComment, type UpdateCommentForm } from "@/type/comments";
import { Field, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getComments, updateComment } from "@/services/comment";
import toast from "react-hot-toast";

interface Props {
  data: Comment;
  todoId: string;
}
const CommentItem = ({ data, todoId }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, control } = useForm<UpdateCommentForm>({
    resolver: zodResolver(updateCommentFormSchema),
    defaultValues: {
      contents: data.contents,
    },
  });
  const onUpdateComment: SubmitHandler<{ id: string; formData: UpdateCommentForm }> = async ({ formData, id }: { id: string; formData: UpdateCommentForm }) => {
    const newData: UpdateComment = {
      id,
      ...formData,
      todo_id: todoId,
    };
    const payload = await updateComment(newData);
    if (payload.ok) {
      toast.success("コメントを更新しました!");
      await getComments(todoId).then(() => setIsEdit(false));
    } else {
      toast.error("更新に失敗しました。!");
    }
  };

  return (
    <li>
      {isEdit ? (
        <form action="" className="mt-2" onSubmit={handleSubmit((formData) => onUpdateComment({ formData, id: data.id }))}>
          <Controller
            name="contents"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input {...field} />
                {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
              </Field>
            )}
          />
          <div className="flex gap-3 mt-2 justify-end">
            <Button type="submit">更新</Button>
            <Button variant="secondary" onClick={() => setIsEdit(false)}>
              キャンセル
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p className="py-[6px] ">{data.contents}</p>
          <div className="flex gap-3 mt-2 justify-end">
            <Button variant="outline" onClick={() => setIsEdit(true)}>
              編集
            </Button>
            <Button variant="destructive">削除</Button>
          </div>
        </>
      )}
    </li>
  );
};

export default CommentItem;
