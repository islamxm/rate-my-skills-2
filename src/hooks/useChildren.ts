import type { MOMAllContent } from "../mom/types";
import { useSelector } from "../shared/lib";
import { shallowEqual } from "react-redux";

export function useChildren(nodeId: string): Array<MOMAllContent> {
  return useSelector((s) => {
    const node = s.document.doc.nodes[nodeId];
    if (!("children" in node)) return [];
    return node.children.map((childId) => s.document.doc.nodes[childId]);
  }, shallowEqual);
}
