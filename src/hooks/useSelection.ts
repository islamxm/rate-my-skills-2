import type { MOMDocument } from "@/mom/types";
import { MOM } from "../mom";
import { useDispatch, useSelector } from "../shared/lib";
import { selectionStoreActions } from "../store/slices/selectionSlice";

export function useSelection() {
  const dispatch = useDispatch();

  const nodes = useSelector((s) => s.document.doc.nodes);
  const rootOrder = useSelector((s) => s.document.doc.rootOrder);
  const selectedIds = useSelector((s) => s.selection.selectedIds);
  const focusedId = useSelector((s) => s.selection.focusedId);

  function isRootNode(nodeId: string): boolean {
    const node = nodes[nodeId];
    if (!node || !MOM.Guard.isRootNode(node)) {
      return false;
    }
    return true;
  }

  /** выделение только одного топ-левел блока */
  function selectOne(nodeId: string) {
    if (!isRootNode(nodeId)) return;
    dispatch(selectionStoreActions.selectNode(nodeId));
  }

  /** для множественного выбора нескольких топ-левел блоков */
  function addToSelect(nodeId: string) {
    if (!isRootNode(nodeId)) return;
    if (selectedIds.length > 0) {
      const firstNode = nodes[selectedIds[0]];
      const targetNode = nodes[nodeId];
      if (firstNode?.groupId !== targetNode?.groupId) {
        console.warn("нельзя выбирать ноды из разных групп");
        return;
      }
    }
    dispatch(selectionStoreActions.addToSelection(nodeId));
  }

  /** отменить выделение конкретного топ-левел блока */
  function removeFromSelect(nodeId: string) {
    dispatch(selectionStoreActions.removeFromSelection(nodeId));
  }

  /** отменить все выделение */
  function clearAllSelection() {
    dispatch(selectionStoreActions.clearSelection());
    dispatch(selectionStoreActions.blurNode());
  }

  /** триггер = tab, переводит фокус и выделение на следующую ноду предварительно выделив его */
  function nextBlock() {
    if (!focusedId) return;
    const indexOfFocused = rootOrder.indexOf(focusedId);
    const nextIndex =
      indexOfFocused + 1 >= rootOrder.length ? 0 : indexOfFocused + 1;
    dispatch(selectionStoreActions.selectNode(rootOrder[nextIndex]));
    dispatch(selectionStoreActions.focusNode(rootOrder[nextIndex]));
  }

  /** триггер = shift+tab, переводит фокус и выделение на предыдущую ноду предварительно выделив его */
  function prevBlock() {
    if (!focusedId) return;

    const indexOfFocused = rootOrder.indexOf(selectedIds[0]);
    const prevIndex =
      indexOfFocused - 1 < 0 ? rootOrder.length - 1 : indexOfFocused - 1;
    dispatch(selectionStoreActions.selectNode(rootOrder[prevIndex]));
    dispatch(selectionStoreActions.focusNode(rootOrder[prevIndex]));
  }

  function selectAll() {
    dispatch(selectionStoreActions.selectBatch(nodes));
  }

  function focuseNode(nodeId: string) {
    dispatch(selectionStoreActions.focusNode(nodeId));
  }

  function focusNewNode(nodeId: string) {
    dispatch(selectionStoreActions.selectNode(nodeId));
    dispatch(selectionStoreActions.focusNode(nodeId));
  }

  function blur() {
    dispatch(selectionStoreActions.blurNode());
  }

  /** выделена ли определенный топ-левел блок */
  function isSelected(nodeId: string) {
    return selectedIds.includes(nodeId);
  }

  function isFocused(nodeId: string) {
    return !!(focusedId && focusedId === nodeId);
  }

  function hasSelection() {
    return selectedIds.length > 0;
  }

  function isMultiSelect() {
    return selectedIds.length > 1;
  }

  return {
    selectedIds,
    focusedId,

    isSelected,
    isFocused,
    hasSelection,
    isMultiSelect,

    selectOne,
    selectAll,
    addToSelect,
    removeFromSelect,
    clearAllSelection,
    nextBlock,
    prevBlock,
    focuseNode,
    focusNewNode,
    blur,
  };
}
