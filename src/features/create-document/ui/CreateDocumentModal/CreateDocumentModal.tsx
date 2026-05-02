import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, Field, FieldGroup, Input, Label, Button } from "@shared/ui";
import { type FC } from "react";
import { useCreateDocument } from "../../lib/useCreateDocument";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateDocumentModal: FC<Props> = ({ open, setOpen }) => {
  const { createNewDocument, isLoading, inputProps, reset } = useCreateDocument();

  const onModalClose = (open: boolean) => {
    setOpen(open);
    if (!open) {
      reset();
    }
  };

  const save = () => {
    createNewDocument();
    onModalClose(false);
  };

  const onSubmit = async (e: React.KeyboardEvent) => {
    if (e.code !== "Enter") return;
    e.preventDefault();
    e.stopPropagation();
    save();
  };

  return (
    <Dialog open={open} onOpenChange={onModalClose}>
      <DialogContent>
        <form onKeyDownCapture={onSubmit} className="flex flex-col gap-[20px]">
          <DialogTitle>Create New Document</DialogTitle>
          <FieldGroup>
            <Field>
              <Label htmlFor="document-title">Document title</Label>
              <Input id="document-title" name="document-title" {...inputProps} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={save} loading={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
