import { Controller, useFormContext, type SubmitHandler } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateComment } from "../types/comments";
interface Props {
  onCreate: SubmitHandler<{
    contents: string;
  }>;
}
const CreateCommentForm = ({ onCreate }: Props) => {
  const { handleSubmit, control } = useFormContext<CreateComment>();
  const onCreateComment = onCreate;

  return (
    <form action="" onSubmit={handleSubmit(onCreateComment)}>
      <Controller
        name="contents"
        control={control}
        render={({ field, fieldState }) => (
          <FieldGroup>
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} />
              {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
            </Field>
            <Button type="submit">追加</Button>
          </FieldGroup>
        )}
      ></Controller>
    </form>
  );
};

export default CreateCommentForm;
