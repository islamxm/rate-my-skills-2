import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui";
import { Trash2 } from "lucide-react";
import { MOM } from "@/mom";
import { useEffect, type FC } from "react";
import { useStorageMutation } from "@/hooks";
import { toast } from "sonner";

type Props = {
  id: string;
  tooltip?: string | boolean;
};

export const DeleteDocumentIconButton: FC<Props> = ({ id, tooltip }) => {
  const [deleteDoc, { isLoading, isError }] = useStorageMutation(MOM.Storage.deleteDocument);

  useEffect(() => {
    if (isError) {
      toast.error("Could not delete document", {
        description: "An error occurred while accessing the database.",
      });
    }
  }, [isError]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"destructive"} onClick={() => deleteDoc(id)} loading={isLoading} size={"icon"}>
          <Trash2 />
        </Button>
      </TooltipTrigger>
      {tooltip && <TooltipContent>{typeof tooltip === "string" ? tooltip : "Delete document"}</TooltipContent>}
    </Tooltip>
  );
};
