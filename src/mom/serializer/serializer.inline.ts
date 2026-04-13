import { getChildrenNodes } from "../selector/selectors";
import type { MOMAllContent, MOMMap } from "../types";

/** @deprecated */
export function renderToHTML(nodes: Array<MOMAllContent>, allNodes: MOMMap) {
  return nodes.map((node) => renderNodeToHTML(node, allNodes)).join("");
}

/** @deprecated */
export function renderNodeToHTML(
  node: MOMAllContent,
  allNodes: MOMMap,
): string {
  switch (node.type) {
    case "text":
      return escapeHTML(node.value ?? "");
    case "strong": {
      const children = getChildrenNodes(allNodes, node.id);
      return `<strong data-id="${node.id}">${renderToHTML(children, allNodes)}</strong>`;
    }
    case "emphasis": {
      const children = getChildrenNodes(allNodes, node.id);
      return `<em data-id="${node.id}">${renderToHTML(children, allNodes)}</em>`;
    }
    case "inlineCode":
      return `<code data-id="${node.id}">${escapeHTML(node.value ?? "")}</code>`;
    case "link": {
      const children = getChildrenNodes(allNodes, node.id);
      return `<a data-id="${node.id}" href="#">${renderToHTML(children, allNodes)}</a>`;
    }
    default:
      return "";
  }
}
/** @deprecated */
function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
