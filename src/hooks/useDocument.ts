import type { MOMAllContent } from "../mom/types";
import { useDispatch, useSelector } from "../shared/lib";
import { documentStoreActions } from "../store/slices/documentSlice";

export function useDocument() {
  const dispatch = useDispatch();

  const doc = useSelector((s) => s.document.doc);
  const nodes = doc.nodes;
  const rootOrder = doc.rootOrder;
  const groups = doc.groups;

  function insertNode(opt: {
    node: MOMAllContent;
    parentId: string | null;
    index?: number;
  }) {
    dispatch(
      documentStoreActions.insertNode({
        ...opt,
        index: opt.index || rootOrder.length,
      }),
    );
  }

  function insertNodes(
    ops: Array<{
      node: MOMAllContent;
      parentId: string | null;
      index: number;
    }>,
  ) {
    const readyOps = ops.map(o => ({...o, index: o.index || rootOrder.length}))
    dispatch(documentStoreActions.insertNodes({ ops: readyOps }));
  }

  function removeNode(nodeId: string) {
    dispatch(documentStoreActions.removeNode({ nodeId }));
  }

  function updateNode<T extends Partial<MOMAllContent>>(opt: {
    nodeId: string;
    patch: T;
  }) {
    dispatch(documentStoreActions.updateNode(opt));
  }

  function moveNode(opt: {
    nodeId: string;
    toParentId: string | null;
    toIndex: number;
  }) {
    dispatch(documentStoreActions.moveNode(opt));
  }

  function groupNodes(opt: { nodeIds: Array<string>; label: string }) {
    dispatch(documentStoreActions.groupNodes(opt));
  }

  function ungroupNodes(groupId: string) {
    dispatch(documentStoreActions.ungroupNodes({ groupId }));
  }

  function renameGroup(opt: { groupId: string; label: string }) {
    dispatch(documentStoreActions.renameGroup(opt));
  }

  function commitInlineEdit(opt: { nodeId: string; nodes: MOMAllContent[] }) {
    dispatch(documentStoreActions.commitInlineEdit(opt));
  }

  function getNode(nodeId: string) {
    return nodes[nodeId];
  }

  return {
    doc,
    nodes,
    rootOrder,
    groups,

    insertNode,
    insertNodes,
    removeNode,
    updateNode,
    moveNode,
    getNode,

    groupNodes,
    ungroupNodes,
    renameGroup,
    commitInlineEdit,
  };
}
