import { useSelector } from "../shared/lib";

/** Хук для подписки к конкретной ноде */
export function useNode(nodeId: string) {
  const node = useSelector((s) => s.document.doc.nodes[nodeId]);
  return node;
}
