import { momToMarkdown } from "../serializer/serializer";
import type { MOMMap } from "../types";

export function exportMarkdown(rootOrder: Array<string>, nodes: MOMMap, title: string) {
  const resultMarkdownString = momToMarkdown(rootOrder, nodes);
  if (!resultMarkdownString) return;
  const blob = new Blob([resultMarkdownString], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.md`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const Export = {
  exportMarkdown,
};
