import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Link } from "react-router";
import { type TodoStatus, type Todo } from "@/type/todo";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateTodoStatus } from "../services/todo";
import { getCommentsCountWithTask } from "@/features/comment/services/comment";
import { CommentsArea } from "@/features/comment/components/CommentsArea";

interface Props {
  data: Todo;
}
export type ActivePopover = "header" | "bottom" | null;
const TodoCard = ({ data }: Props) => {
  const [statusState, setStatusState] = useState<TodoStatus>(data.status);
  const [commentsCountState, setCommentsCountState] = useState<number>(0);
  const onChangeStatus = async (message: string, status: TodoStatus) => {
    const payload = await updateTodoStatus({ status, id: data.id });
    if (payload.ok) {
      toast.success(message);
      setStatusState(status);
    } else {
      toast.error("更新できませんでした。");
    }
  };
  const statusChangeButton = () => {
    switch (statusState) {
      case "TODO":
        return (
          <Button variant="progress" onClick={() => onChangeStatus("作業開始", "PROGRESS")}>
            Start
          </Button>
        );

      case "PROGRESS":
        return (
          <>
            <Button variant="todo" onClick={() => onChangeStatus("リセット", "TODO")}>
              Recet
            </Button>
            <Button variant="complete" onClick={() => onChangeStatus("完了", "COMPLETE")}>
              Done
            </Button>
          </>
        );
      case "COMPLETE":
        return (
          <Button variant="todo" onClick={() => onChangeStatus("Reset", "TODO")}>
            Recet
          </Button>
        );
      default:
        break;
    }
  };
  // コメント件数を取得
  useEffect(() => {
    const fetchComments = async () => {
      const payload = await getCommentsCountWithTask(data.id);
      if (payload.ok) {
        setCommentsCountState(payload.data);
      }
    };
    fetchComments();
  }, []);
  return (
    <>
      <Card className="gap-2 py-3 h-max" key={data.id}>
        <CardHeader className="px-3">
          <div className="flex justify-end">
            <Button asChild className="text-right">
              <Link to={`/tasks/${data.id}/edit`}>Edit</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <CardTitle>{data.title}</CardTitle>
            <Badge variant={statusState.toLowerCase() as "todo" | "progress" | "complete"}>{statusState}</Badge>
          </div>
        </CardHeader>
        <CardContent className="px-3">
          <p>{data.contents}</p>
          <div className="flex gap-3 flex-wrap mt-3">{statusChangeButton()}</div>
        </CardContent>
        <CardFooter className="block px-3">
          <CommentsArea todoId={data.id} commentsCount={commentsCountState} setCommentsCountState={setCommentsCountState} />
        </CardFooter>
      </Card>
    </>
  );
};

export default TodoCard;
