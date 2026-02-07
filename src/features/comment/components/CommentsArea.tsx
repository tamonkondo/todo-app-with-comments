import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Todo } from "@/type/todo";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CreateCommentForm from "./CreateCommentForm";
import { createCommentSchema, type Comment, type CreateComment, type InsertComment } from "../types/comments";
import { createComment, getComments } from "../services/comment";
import type { ActivePopover } from "@/features/todo/components/TodoCard";
import Comments from "./Comments";

interface Props {
  todoId: Todo["id"];
  commentsCount: number;
  setCommentsCountState: Dispatch<SetStateAction<number>>;
}
export const CommentsArea = ({ todoId, commentsCount, setCommentsCountState }: Props) => {
  const [activePopover, setActivePopover] = useState<ActivePopover>(null);
  const [isView, setIsView] = useState(false);
  const [commentsData, setCommentsData] = useState<Comment[] | null>(null);
  useEffect(() => {
    const fetchComments = async () => {
      const payload = await getComments(todoId);
      if (payload.ok) {
        setCommentsData(payload.data);
      }
    };
    fetchComments();
  }, []);

  const method = useForm<CreateComment>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      contents: "",
    },
  });
  const onCreateComment: SubmitHandler<CreateComment> = useCallback(async (formData: CreateComment) => {
    const newData: InsertComment = {
      ...formData,
      todo_id: todoId,
    };
    const payload = await createComment(newData);
    if (payload.ok) {
      toast.success("新規コメントを作成しました。");
      await getComments(todoId).then((comment) => {
        setActivePopover(null);
        setIsView(true);
        setCommentsCountState((prev) => prev + 1);
        if (comment.ok) {
          setCommentsData((prev) => (prev ? [...prev, ...comment.data] : [...comment.data]));
        }
      });
    } else {
      toast.error("コメントの作成に失敗しました。");
      console.log(payload.error);
    }
  }, []);

  const variants = {
    open: {
      height: "auto",
    },
    closed: {
      height: 0,
    },
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="px-2" onClick={() => setIsView((prev) => !prev)}>
          View Comments <span className="rounded-full border w-[20px] aspect-square">{commentsCount ?? 0}</span>
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
      <AnimatePresence initial={false}>
        {isView && Array.isArray(commentsData) && (
          <motion.div className="overflow-hidden" variants={variants} initial="closed" exit={"closed"} animate={isView ? "open" : "closed"} transition={{ duration: 0.75 }}>
            <Comments todoId={todoId} data={commentsData} />
            <hr className="mt-4" />
            <div className="grid place-items-center mt-4">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
