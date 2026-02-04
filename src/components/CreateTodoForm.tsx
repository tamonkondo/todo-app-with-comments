import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { createTodoSchema, type CreateTodo, type InsertTodo } from "@/type/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { createTodo } from "@/services/todo";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "./ui/input-group";
import { Button } from "./ui/button";

const CreateTodoForm = () => {
  const [globalError, setGlobalError] = useState("");

  const { handleSubmit, control, reset } = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "test",
      contents: "test contents",
      due_date: "",
    },
  });
  const onSubmit: SubmitHandler<CreateTodo> = async (data: CreateTodo) => {
    console.log(data);
    // 値が空の場合はオブジェクトから削除するが、型安全性を保つ
    const newData: InsertTodo = {
      ...data,
      ...(data.contents === "" ? { contents: undefined } : {}),
      ...(data.due_date === "" ? { due_date: undefined } : {}),
    };
    const payload = await createTodo(newData);
    if (payload.ok) {
      reset();
    } else {
      setGlobalError(payload.message);
      console.log(payload);
    }
  };

  return (
    <Card className="mt-5 gap-2">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
        <CardDescription>新しいタスクを追加してください。</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <FieldGroup className="gap-2">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invarlid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
              )}
            />
            <Controller
              name="contents"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invarlid={fieldState.invalid}>
                  <FieldLabel>Contents</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>{field.value?.length}/100文字</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
              )}
            />
            <Controller
              name="due_date"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invarlid={fieldState.invalid}>
                  <FieldLabel>Date</FieldLabel>
                  <Input type="date" {...field} />
                </Field>
              )}
            />
            <Button className="w-[200px] mx-auto mt-5" type="submit">
              送信
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTodoForm;
