import { nanoid } from "nanoid";
import type { MOMAllContent, MOMText } from "../types";

export function parseDOMtoMOM(element: HTMLElement) {
  return parseDOMChildNodes(element, null);
}

export function parseDOMChildNodes(
  element: HTMLElement | Node,
  parentId: string | null,
) {
  const result: Array<MOMAllContent> = [];

  for (const child of element.childNodes) {
    const nodes = parseDOMNode(child, parentId);
    result.push(...nodes);
  }

  return result;
}
export function parseDOMNode(node: Node, parentId: string | null) {
  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.textContent ?? "";
    if (!value) return [];
    const textNode: MOMText = {
      id: nanoid(),
      parentId,
      type: "text",
      value,
      marks: {}
    };

    return [textNode];
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return [];

  const el = node as HTMLElement;
  const existingId = el.dataset.id ?? nanoid();

  switch (el.tagName.toLowerCase()) {
    case "strong":
    case "b": {
      const id = existingId;
      const children = parseDOMChildNodes(el, id);
      const strongNode: MOMAllContent = {
        id,
        parentId,
        type: "strong",
        children: children.map((c) => c.id),
      } as any;
      return [strongNode, ...children];
    }
    case "em":
    case "i": {
      const id = existingId;
      const children = parseDOMChildNodes(el, id);
      const emphasisNode: MOMAllContent = {
        id,
        parentId,
        type: "emphasis",
        children: children.map((c) => c.id),
      } as any;
      return [emphasisNode, ...children];
    }
    case "code": {
      const inlineCodeNode: MOMAllContent = {
        id: existingId,
        parentId,
        type: "inlineCode",
        value: el.textContent ?? "",
      } as any;
      return [inlineCodeNode];
    }
    case "a": {
      const id = existingId;
      const children = parseDOMChildNodes(el, id);
      const linkNode: MOMAllContent = {
        id,
        parentId,
        type: "link",
        url: el.getAttribute("href") ?? "",
        children: children.map((c) => c.id),
      } as any;
      return [linkNode, ...children];
    }
    default:
      return parseDOMChildNodes(el, parentId);
  }
}
