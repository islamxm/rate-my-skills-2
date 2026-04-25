import { Button, TooltipContent, TooltipTrigger, Tooltip } from "@shared/ui";
import { Download } from "lucide-react";
import { useExportMarkdownFromStorage } from "../../lib/useExportMarkdownFromStorage";
import { useEffect, type FC } from "react";
import { toast } from "sonner";

export type Props = {
  id: string;
  tooltip?: string | boolean;
};

export const DownloadMarkdownIconButton: FC<Props> = ({ id, tooltip }) => {
  const { exportMarkdown, isLoading, isError } = useExportMarkdownFromStorage();

  useEffect(() => {
    if (isError) {
      toast.error("Could not export document", {
        description: "An error occurred while generating the Markdown file.",
      });
    }
  }, [isError]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"icon"} loading={isLoading} onClick={() => exportMarkdown(id)} className="bg-blue-500 hover:bg-blue-700">
          <Download />
        </Button>
      </TooltipTrigger>
      {tooltip && <TooltipContent>{typeof tooltip === "string" ? tooltip : "Download document as Markdown file"}</TooltipContent>}
    </Tooltip>
  );
};
