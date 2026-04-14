import type {
  MOMAllContent,
  MOMBlockNode,
  MOMBlockNodeType,
  MOMInlineNode,
  MOMInlineNodeType,
  MOMParentNode,
} from "../types";

export function isParentNode(node: MOMAllContent): node is MOMParentNode {
  return "children" in node;
}
export function isRootNode(node: MOMAllContent): boolean {
  return node.parentId === null;
}
export function isLeaf(node: MOMAllContent): boolean {
  return !("children" in node) || node.children.length === 0;
}
export function isGrouped(node: MOMAllContent): boolean {
  return !!node.groupId;
}

/** Разделение блочных и инлайновых элементов с точки зрения редактирования */
export const MOM_TYPE = {
  block: [
    "paragraph",
    "heading",
    "code",
    "image",
    "list",
    "blockquote",
    "alert",
    "thematicBreak",
    "raw"
  ] as Array<MOMBlockNodeType>,
  inline: [
    "listItem",
    "paragraph",
    "inlineCode",
    "text",
  ] as Array<MOMInlineNodeType>,
};

/** является ли нода блочным, то есть top-level */
export function isBlockNode(node: MOMAllContent): node is MOMBlockNode {
  return MOM_TYPE.block.includes(node.type as MOMBlockNodeType);
}

/** является ли нода инлайновым, то есть составной нодой top-level блоков */
export function isInlineNode(node: MOMAllContent): node is MOMInlineNode {
  return MOM_TYPE.inline.includes(node.type as MOMInlineNodeType);
}

export function isTextNode(node: MOMAllContent) {
  return node.type === "text";
}
export function isListItemNode(node: MOMAllContent) {
  return node.type === "listItem";
}
export function isParagraphNode(node: MOMAllContent) {
  return node.type === "paragraph";
}
export function isInlineCodeNode(node: MOMAllContent) {
  return node.type === "inlineCode";
}
export function isHeadingNode(node: MOMAllContent) {
  return node.type === "heading";
}
export function isCodeNode(node: MOMAllContent) {
  return node.type === "code";
}
export function isImageNode(node: MOMAllContent) {
  return node.type === "image";
}
export function isListNode(node: MOMAllContent) {
  return node.type === "list";
}
export function isBlockquoteNode(node: MOMAllContent) {
  return node.type === "blockquote";
}
export function isAlertNode(node: MOMAllContent) {
  return node.type === "alert";
}
export function isThematicBreak(node: MOMAllContent) {
  return node.type === "thematicBreak";
}
export function isRawNode(node: MOMAllContent) {
  return node.type === "raw";
}

export function isValidHtmlElement(element: HTMLElement) {
  return !!element.dataset.id;
}

export const Guard = {
  isParentNode,
  isRootNode,
  isLeaf,
  isGrouped,

  isBlockNode,
  isInlineNode,

  isTextNode,
  isListItemNode,
  isParagraphNode,
  isInlineCodeNode,
  isHeadingNode,
  isImageNode,
  isListNode,
  isBlockquoteNode,
  isAlertNode,
  isThematicBreak,
  isCodeNode,
  isRawNode,
  isValidHtmlElement
};
