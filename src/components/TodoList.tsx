/**
 * PopOverを分離してlazyにすればいい感じにできそう。
 * */ 
import type { Todo } from "@/type/todo";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import Comments from "./Comments";
interface Props {
  data: Todo[];
}
const TodoList = ({ data }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isViewComments, setIsViewComments] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const addComment = () => {
    setIsViewComments(true);
    setIsPopoverOpen(false);
  };

  return (
    <div className="mt-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {Array.isArray(data) &&
        data.map((item) => (
          <Card className="gap-2 py-3" key={item.id}>
            <CardHeader className="px-3">
              <div className="flex justify-end">
                <Button asChild className="text-right">
                  <Link to={"/tasks/11/edit"}>Edit</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <CardTitle>{item.title}</CardTitle>
                <Badge variant="todo">Todo</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-3">
              <p>{item.contents}</p>
              <div className="flex gap-3 flex-wrap mt-3">
                <Button variant="progress">Start</Button>
                <Button variant="complete">Done</Button>
              </div>
            </CardContent>
            <CardFooter className="block px-3">
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="px-2" onClick={() => setIsViewComments((prev) => !prev)}>
                  View Comments <span className="rounded-full border w-[20px] aspect-square">1</span>
                </Button>
                <Popover open={!!isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="px-2">
                      Add Comment
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top">
                    <form action="">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>コメント</FieldLabel>
                          <Input placeholder="コメントを追加して下さい。" />
                        </Field>
                        <Button type="button" onClick={() => addComment()}>
                          追加
                        </Button>
                      </FieldGroup>
                    </form>
                  </PopoverContent>
                </Popover>
              </div>
              {isViewComments && <Comments isEdit={isEditComment} setIsEdit={setIsEditComment} />}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default TodoList;
