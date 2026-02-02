import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

const TaskEditModalPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { taskId } = useParams();

  const checkId = (id: string) => {
    return true;
  };
  if (!checkId(taskId!)) return <Navigate to={"/"} replace />;
  // タスク一覧の中に該当のデータがなければリダイレクト
  useEffect(() => {
    if (!isOpen) {
      <Navigate to={"/"} replace />;
    }
    return;
  }, [isOpen]);

  const closeOverlay = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={true}>
      {/* コメントの簡易フォーム */}
      {/* 編集ダイアログ これはOutletでEditにするやつ。 */}
      {/* onOpenChangeが状態管理をしているstateのsetを渡せば、自動で背景とかのやつも消えるようになるのか */}
      {/* showCloseButtonの閉じるボタンとかのトリガーはonOpenChangeにかかっている。 */}
      <DialogOverlay onClick={() => closeOverlay()}>
        <DialogContent showCloseButton={false}>
          <form action="">
            <FieldGroup className="gap-2">
              <Field>
                <DialogTitle>
                  <FieldLabel>Title</FieldLabel>
                </DialogTitle>
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
      </DialogOverlay>
    </Dialog>
  );
};

export default TaskEditModalPage;
