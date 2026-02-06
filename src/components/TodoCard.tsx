import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

import { Link } from "react-router";
import type { Todo } from "@/type/todo";
import { Badge } from "./ui/badge";
import { lazy, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { createCommentSchema, type CreateComment, type InsertComment } from "@/type/comments";
import { createComment, getComments } from "@/services/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateCommentForm from "./CreateCommentForm";
import toast from "react-hot-toast";

const CommentsContainer = lazy(() => import("./CommentsContainer"));

interface Props {
  commentsCount: Record<string, number>;
  data: Todo;
}
export type ActivePopover = "header" | "bottom" | null;
const TodoCard = ({ data, commentsCount }: Props) => {
  const [activePopover, setActivePopover] = useState<ActivePopover>(null);
  const [isViewComments, setIsViewComments] = useState(false);

  const method = useForm<CreateComment>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      contents: "",
    },
  });
  const onCreateComment: SubmitHandler<CreateComment> = async (formData: CreateComment) => {
    const newData: InsertComment = {
      ...formData,
      todo_id: data.id,
    };
    const payload = await createComment(newData);

    if (payload.ok) {
      toast.success("新規コメントを作成しました。");
      await getComments(data.id).then(() => setActivePopover(null));
    } else {
      console.log(payload.error);
    }
  };

  return (
    <>
      <Card className="gap-2 py-3" key={data.id}>
        <CardHeader className="px-3">
          <div className="flex justify-end">
            <Button asChild className="text-right">
              <Link to={`/tasks/${data.id}/edit`}>Edit</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <CardTitle>{data.title}</CardTitle>
            <Badge variant="todo">Todo</Badge>
          </div>
        </CardHeader>
        <CardContent className="px-3">
          <p>{data.contents}</p>
          <div className="flex gap-3 flex-wrap mt-3">
            <Button variant="progress">Start</Button>
            <Button variant="todo">Recet</Button>
            <Button variant="complete">Done</Button>
          </div>
        </CardContent>
        <CardFooter className="block px-3">
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="px-2" onClick={() => setIsViewComments((prev) => !prev)}>
              View Comments <span className="rounded-full border w-[20px] aspect-square">{commentsCount?.[data.id] ?? 0}</span>
            </Button>
            <Popover
              open={activePopover === "header"}
              onOpenChange={(open) => {
                setActivePopover(open ? "header" : null);
                if (open) {
                  method.reset();
                }
              }}
              modal
            >
              <PopoverTrigger asChild>
                <Button variant="outline" className="" onClick={() => setActivePopover("header")}>
                  追加
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" sticky="partial">
                <FormProvider {...method}>
                  <CreateCommentForm onCreate={onCreateComment} />
                </FormProvider>
              </PopoverContent>
            </Popover>
          </div>
          {isViewComments && (
            <CommentsContainer
              todoId={data.id}
              commentBottomRender={
                <Popover
                  open={activePopover === "bottom"}
                  onOpenChange={(open) => {
                    setActivePopover(open ? "bottom" : null);
                    if (open) {
                      method.reset();
                    }
                  }}
                  modal
                >
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="" onClick={() => setActivePopover("bottom")}>
                      追加
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" sticky="partial">
                    <FormProvider {...method}>
                      <CreateCommentForm onCreate={onCreateComment} />
                    </FormProvider>
                  </PopoverContent>
                </Popover>
              }
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TodoCard;
