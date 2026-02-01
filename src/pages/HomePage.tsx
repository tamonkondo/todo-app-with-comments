import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import * as z from "zod";

/**
 * タスクの種類
 *
 * */

const statusSchema = z.enum(["TODO", "PROGRESS", "DONE"]);
const taskSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional().nullable(),
  date: z.iso
    .datetime()
    .transform((v) => new Date(v))
    .optional(),
  status: statusSchema,
});
const registerTaskSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  date: z.iso.datetime().transform((v) => new Date(v)),
});
const updateTaskSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください。"),
  contents: z.string().max(100, "文字は100文字までです。").optional(),
  status: statusSchema,
  date: z.iso
    .datetime()
    .transform((v) => new Date(v))
    .optional(),
});

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
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
              <Button className="text-right" onClick={() => handleOpen()}>
                Edit
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
              <Button variant="outline" className="px-2">
                View Comments <span className="rounded-full border w-[20px] aspect-square">1</span>
              </Button>
              <Button variant="outline" className="px-2">
                Add Comment
              </Button>
            </div>
            <ul className="grid gap-3">
              <li>
                <p>コメント1</p>
                <Field>
                  <Input></Input>
                </Field>
                <div className="flex gap-3 mt-2 justify-end">
                  <Button variant="outline">編集</Button>
                  <Button variant="destructive">削除</Button>
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
          </CardFooter>
        </Card>

        <Card className="gap-2">
          <CardHeader className="flex items-center">
            <CardTitle>タスク名</CardTitle>
            <Badge variant="progress">Progress</Badge>
          </CardHeader>
          <CardContent>
            <p>タスク内容タスク内容タスク内容タスク内容タスク内容</p>
            <div className="flex gap-3 flex-wrap mt-3">
              <Button variant="todo">Recet</Button>
              <Button variant="complete">Done</Button>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex items-center">
            <CardTitle>タスク名</CardTitle>
            <Badge variant="complete">Done</Badge>
          </CardHeader>
          <CardContent>
            <p>タスク内容タスク内容タスク内容タスク内容タスク内容</p>
            <div className="flex gap-3 flex-wrap mt-3">
              <Button variant="todo">Recet</Button>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        {/* 編集ダイアログ これはOutletでEditにするやつ。 */}

        <Dialog open={!!isOpen}>
          <DialogContent>
            <DialogClose>閉じる</DialogClose>
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
                <Button className="w-[200px] mx-auto mt-5">更新</Button>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default HomePage;
