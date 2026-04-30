import { FilePlus, Redo2, Undo2 } from "lucide-react";
import { Button } from "@shared/ui";
import { useHistory } from "@/hooks";

import { ExportMarkdownButton } from "@/features/export-markdown";
import { Menu } from "../Menu/Menu";
import { CreateDocumentButton } from "@/features/create-document";
import { DocumentTitle } from "../DocumentTitle/DocumentTitle";

export const TopToolbar = () => {
  const { undo, redo } = useHistory();

  return (
    <div className="flex p-2 gap-1 justify-between flex-1 bg-white">
      <div className="flex gap-1">
        <div className="flex gap-1">
          <CreateDocumentButton variant={"outline"}>
            <FilePlus />
            New Document
          </CreateDocumentButton>
          <Button variant={"outline"} onClick={undo} size={"icon"}>
            <Undo2 />
          </Button>
          <Button variant={"outline"} onClick={redo} size={"icon"}>
            <Redo2 />
          </Button>
        </div>
        
        <Menu />
      </div>
      <div className="flex gap-1">
        <DocumentTitle />
        <ExportMarkdownButton />
      </div>
    </div>
  );
};
