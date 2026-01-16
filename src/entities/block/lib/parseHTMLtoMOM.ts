import type { MOMBlocksMap, MOMElement } from "../model/types";
import { createEmphasis, createStrong, createText } from "./fabrics";

export const parseDOMtoMOM = (surfaceNode: Node) => {
  const MOMMap: MOMBlocksMap = {};

  const traverseNode = (node: Node) => {
    const childrenIds: Array<string> = [];
    const childNodes = node.childNodes;
    if (childNodes) {
      childNodes.forEach((childNode) => {
        if (childNode instanceof HTMLElement) {
          const id = childNode.getAttribute("data-id");
          const type = childNode.getAttribute(
            "data-type"
          ) as MOMElement["type"];
          if (id) {
            // можно реализовать это с помощью паттерна стратегия но пока оставим так
            if (type === "text") {
              MOMMap[id] = createText(childNode.textContent, id);
            }
            if (type === "emphasis") {
              const nestedChildren = traverseNode(childNode);
              MOMMap[id] = createEmphasis(nestedChildren, id);
            }
            if (type === "strong") {
              const nestedChildren = traverseNode(childNode);
              MOMMap[id] = createStrong(nestedChildren, id);
            }
            childrenIds.push(id);
          }
        }
      });
    }
    return childrenIds;
  };
  traverseNode(surfaceNode);
  return MOMMap;
};
