import { isParentNode } from "../validator/typeGuards";
import type { MOMAllContent, MOMDocument, MOMGroupMeta } from "../types";

export function getNodeById(
  id: string,
  nodes: MOMDocument["nodes"],
): MOMAllContent | undefined {
  return nodes[id];
}
export function getChildrenNodes(nodes: MOMDocument["nodes"], nodeId: string) {
  const children: Array<MOMAllContent> = [];
  const node = getNodeById(nodeId, nodes);
  if (!node || !isParentNode(node)) return children;
  node.children.forEach((childrenId) => {
    const childNode = nodes[childrenId];
    if (childNode) {
      children.push(childNode);
    }
  });
  return children;
}
export function getSortedRootNodes(doc: MOMDocument) {
  const { nodes, rootOrder } = doc;
  const sortedNodes: Array<MOMAllContent> = [];
  rootOrder.forEach((nodeId) => {
    const node = getNodeById(nodeId, nodes);
    if (node) {
      sortedNodes.push(node);
    }
  });
  return sortedNodes;
}
export function getSiblingNodes(
  doc: MOMDocument,
  nodeId: string,
): Array<MOMAllContent> {
  const node = getNodeById(nodeId, doc.nodes);
  if (!node) return [];

  if (node.parentId === null) {
    return getSortedRootNodes(doc).filter((n) => n.id !== nodeId);
  }
  return getChildrenNodes(doc.nodes, node.parentId);
}
export function getNodeIndex(doc: MOMDocument, nodeId: string) {
  const node = getNodeById(nodeId, doc.nodes);
  if (!node) return -1;
  if (node.parentId === null) {
    return doc.rootOrder.indexOf(nodeId);
  }
  const parent = doc.nodes[node.parentId];
  if (!parent || !isParentNode(parent)) return -1;
  return parent.children.indexOf(nodeId);
}
export function getGroup(doc: MOMDocument, groupId: string): MOMGroupMeta {
  return doc.groups[groupId];
}
export function getGroupNodes(doc: MOMDocument, groupId: string) {
  const sortedNodes = getSortedRootNodes(doc);
  const sortedGroupNodes: Array<MOMAllContent> = [];
  sortedNodes.forEach((node) => {
    if (node && node.groupId && node.groupId === groupId) {
      sortedGroupNodes.push(node);
    }
  });
  return sortedGroupNodes;
}
export function getDescendants(
  nodes: MOMDocument["nodes"],
  nodeId: string,
): Array<MOMAllContent> {
  const node = getNodeById(nodeId, nodes);
  if (!node || !isParentNode(node)) return [];

  return node.children.flatMap((childId) => {
    const child = getNodeById(childId, nodes);
    if (!child) return [];
    return [child, ...getDescendants(nodes, childId)];
  });
}
export function isDescendantOf(opt: {
  nodes: MOMDocument["nodes"];
  nodeId: string;
  potentialAncestorId: string;
}): boolean {
  const { nodes, nodeId, potentialAncestorId } = opt;
  const node = getNodeById(nodeId, nodes);
  if (!node || node.parentId === null) return false;
  if (node.parentId === potentialAncestorId) return true;
  return isDescendantOf({ nodes, nodeId: node.parentId, potentialAncestorId });
}

export const Selector = {
  getNodeById,
  getChildrenNodes,
  getSortedRootNodes,
  getSiblingNodes,
  getGroup,
  getGroupNodes,
  getDescendants,
  isDescendantOf,
} as const;
