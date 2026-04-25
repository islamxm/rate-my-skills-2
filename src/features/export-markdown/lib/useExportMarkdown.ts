import { useDocument } from "@/hooks";
import { MOM } from "@/mom";

export function useExportMarkdown() {
  const { rootOrder, nodes, title } = useDocument();

  const exportMarkdown = () => {
    MOM.Export.exportMarkdown(rootOrder, nodes, title);
  };

  return {
    exportMarkdown,
  };
}
