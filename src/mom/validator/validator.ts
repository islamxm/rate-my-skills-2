import { getChildrenNodes, getNodeById } from "../selector/selectors";
import type { MOMDocument, MOMNodeType } from "../types";
import type { ValidationError, ValidationResult } from "./validator.types";

/** Порядок вложенности элементов */
export const ALLOWED_CHILDREN: Record<MOMNodeType, Array<MOMNodeType>> = {
  root: [
    "blockquote",
    "alert",
    "list",
    "listItem",
    "text",
    "paragraph",
    "heading",
    "inlineCode",
    "code",
    "thematicBreak",
    "image",
    "html"
  ],
  blockquote: ["text"],
  alert: ["text"],
  list: ["listItem"],
  listItem: ["text"],
  paragraph: ["text"],
  heading: [],
  text: [],
  inlineCode: [],
  code: [],
  thematicBreak: [],
  image: [],
  html: [],
};

/** Проверка может ли иметь один элемент в качестве ребенка другой элемент (обертка над ALLOWED_CHILDREN) */
export function canInsert(parentType: MOMNodeType, childType: MOMNodeType) {
  return ALLOWED_CHILDREN[parentType].includes(childType);
}

/**  */
export function validateNode(
  doc: MOMDocument,
  nodeId: string,
): Array<ValidationError> {
  const errors: Array<ValidationError> = [];
  const node = getNodeById(nodeId, doc.nodes);
  if (!node) {
    return [
      {
        nodeId,
        type: "orphan_node",
        message: "Нода есть в дереве но отстутствует в nodes",
      },
    ];
  }

  const allowed = ALLOWED_CHILDREN[node.type];

  if (allowed.length === 0) {
    return errors;
  }

  const children = getChildrenNodes(doc.nodes, nodeId);

  for (const child of children) {
    if (!canInsert(node.type, child.type)) {
      errors.push({
        nodeId,
        type: "invalid_child",
        message: "",
      });
    }
  }

  return errors;
}

export function validateTree(doc: MOMDocument): ValidationResult {
  const errors: Array<ValidationError> = [];

  for (const nodeId of Object.keys(doc.nodes)) {
    errors.push(...validateNode(doc, nodeId));
  }
  for (const id of doc.rootOrder) {
    if (!doc.nodes[id]) {
      errors.push({
        nodeId: id,
        type: "missing_child",
        message: "",
      });
    }
  }
  for (const groupId of Object.keys(doc.groups)) {
    const groupNodes = Object.values(doc.nodes).filter(
      (n) => n.groupId === groupId,
    );
    if (groupNodes.length === 0) {
      errors.push({
        nodeId: groupId,
        type: "orphan_node",
        message: "",
      });
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

export const Validator = {
  canInsert,
  validateNode,
  validateTree,
};
