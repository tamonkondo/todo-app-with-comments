import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { getTodoForUpdateForm, getTodo, updateTodo } from "@/services/todo";
import { updateTodoFormSchema, type UpdateTodo, type UpdateTodoForm } from "@/type/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router";

const TodoEditModalPage = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  if (!todoId) return <Navigate to={"/"} replace />;

  const { handleSubmit, control } = useForm<UpdateTodoForm>({
    resolver: zodResolver(updateTodoFormSchema),
    defaultValues: async () => await getTodoForUpdateForm(todoId),
  });
  const onUpdateTodo: SubmitHandler<UpdateTodoForm> = async (formData: UpdateTodoForm) => {
    const newData: UpdateTodo = {
      id: todoId,
      ...formData,
    };
    const payload = await updateTodo(newData);
    if (payload.ok) {
      toast.success("コメントを更新しました!");
      if (todoId) {
        await getTodo(todoId).then(() => navigate("/"));
      }
    } else {
      toast.error("更新に失敗しました。!");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent onPointerDownOutside={() => navigate("/")} showCloseButton={false}>
        <form action="" onSubmit={handleSubmit((formData) => onUpdateTodo(formData))}>
          <FieldGroup className="gap-2">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <DialogTitle>
                    <FieldLabel>Title</FieldLabel>
                  </DialogTitle>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
              )}
            />
            <Controller
              name="contents"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contents</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>/100文字</InputGroupText>
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
                <Field>
                  <FieldLabel>Date</FieldLabel>
                  <Input type="date" {...field} />
                  {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
                </Field>
              )}
            />
            <Button className="w-[200px] mx-auto mt-5" type="submit">
              更新
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoEditModalPage;
