import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  isEdit: boolean;
  setIsEdit: (prev: boolean) => void;
}

const Comments = ({ isEdit, setIsEdit }: Props) => {
  return (
    <>
      <ul className="grid gap-3">
        <li>
          {isEdit ? (
            <Field>
              <Input></Input>
            </Field>
          ) : (
            <p className="py-[6px] ">コメント1</p>
          )}

          <div className="flex gap-3 mt-2 justify-end">
            {isEdit ? (
              <>
                <Button>更新</Button>
                <Button variant="secondary" onClick={() => setIsEdit(false)}>
                  キャンセル
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEdit(true)}>
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
  );
};

export default Comments;
