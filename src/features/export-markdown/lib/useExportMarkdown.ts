import { useDocument } from "@/hooks";
import { MOM } from "@/mom";

export function useExportMarkdown() {
  const { rootOrder, nodes } = useDocument();

  const exportMarkdown = () => {
    MOM.Export.exportMarkdown(rootOrder, nodes);
  };

  return {
    exportMarkdown,
  };
}
