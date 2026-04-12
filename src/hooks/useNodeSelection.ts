import { useSelector } from "@/shared/lib";

export function useNodeSelection(nodeId: string) {
  const isFocused = useSelector((s) => s.selection.focusedId === nodeId);
  const isSelected = useSelector((s) =>
    s.selection.selectedIds.includes(nodeId),
  );

  const isOnlySelected = useSelector(
    (s) =>
      s.selection.selectedIds.length === 1 &&
      s.selection.selectedIds.includes(nodeId),
  );

  return {
    isFocused,
    isSelected,
    isOnlySelected
  };
}
