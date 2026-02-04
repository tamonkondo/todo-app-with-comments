import React from "react";
import { Controller, type Control, type SubmitHandler, type UseFormHandleSubmit } from "react-hook-form";
import { Field, FieldError } from "./ui/field";
import { Input } from "./ui/input";
interface Props {
  id: string;
  control: Control<
    {
      contents: string;
    },
    any,
    {
      contents: string;
    }
  >;
  handleSubmit: UseFormHandleSubmit<
    {
      contents: string;
    },
    {
      contents: string;
    }
  >;
  onUpdate: SubmitHandler<{
    id: string;
    formData: {
      contents: string;
    };
  }>;
}
const AddCommnetButton = ({ id, control, handleSubmit, onUpdate }: Props) => {
  return (
    <form action="" onSubmit={handleSubmit((formData) => onUpdate({ formData, id: id }))}>
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
  );
};

export default AddCommnetButton;
