import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { useState } from "react";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link, Outlet } from "react-router";

/**
 * タスクの種類
 *
 * */


const HomePageLayout = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isViewComments, setIsViewComments] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const addComment = () => {
    setIsViewComments(true);
    setIsPopoverOpen(false);
  };
  return (
    <>
      <TypographyH1 className="text-center">Top Page</TypographyH1>
      {/* タスク入力 */}
      <Card className="mt-5 gap-2">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>新しいタスクを追加してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <FieldGroup className="gap-2">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input />
                <FieldError>1文字以上で入力してください。</FieldError>
              </Field>
              <Field>
                <FieldLabel>Contents</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>/100文字</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>1文字以上で入力してください。</FieldError>
              </Field>
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input type="date" />
              </Field>
              <Button className="w-[200px] mx-auto mt-5">送信</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* タスク表示 */}
      <TypographyH2 className="mt-4">Tasks</TypographyH2>
      <div className="mt-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <Card className="gap-2 py-3">
          <CardHeader className="px-3">
            <div className="flex justify-end">
              <Button asChild className="text-right">
                <Link to={"/tasks/11/edit"}>Edit</Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <CardTitle>タスク名</CardTitle>
              <Badge variant="todo">Todo</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <p>タスク内容タスク内容タスク内容タスク内容タスク内容</p>
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
            {isViewComments && (
              <>
                <ul className="grid gap-3">
                  <li>
                    {isEditComment ? (
                      <Field>
                        <Input></Input>
                      </Field>
                    ) : (
                      <p className="py-[6px] ">コメント1</p>
                    )}

                    <div className="flex gap-3 mt-2 justify-end">
                      {isEditComment ? (
                        <>
                          <Button>更新</Button>
                          <Button variant="secondary" onClick={() => setIsEditComment(false)}>
                            キャンセル
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" onClick={() => setIsEditComment(true)}>
                            編集
                          </Button>
                          <Button variant="destructive">削除</Button>
                        </>
                      )}
                    </div>
                  </li>
                  <li>
                    <p>コメント2</p>
                    <div className="flex gap-3 mt-2 justify-end">
                      <Button variant="outline">編集</Button>
                      <Button variant="destructive">削除</Button>
                    </div>
                  </li>
                </ul>
                <hr className="mt-4" />
                <div className="grid place-items-center mt-4">
                  <Button variant="outline" className="">
                    追加
                  </Button>
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
      <Outlet />
    </>
  );
};

export default HomePageLayout;
