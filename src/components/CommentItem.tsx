import { Controller, useFormContext, type SubmitHandler } from "react-hook-form";
import { type Comment, type UpdateComment } from "@/type/comments";
import { Field, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
  data: Comment;
  onUpdate: SubmitHandler<{
    id: string;
    formData: {
      contents: string;
    };
  }>;
}
const CommentItem = ({ data, onUpdate }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, control } = useFormContext<UpdateComment>();

  return (
    <li>
      {isEdit ? (
        <>
          <form action="" onSubmit={handleSubmit((formData) => onUpdate({ formData, id: data.id }))}>
            <Controller
              name="contents"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
              )}
            ></Controller>
          </form>
          <div className="flex gap-3 mt-2 justify-end">
            <>
              <Button>更新</Button>
              <Button variant="secondary" onClick={() => setIsEdit(false)}>
                キャンセル
              </Button>
            </>
          </div>
        </>
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
