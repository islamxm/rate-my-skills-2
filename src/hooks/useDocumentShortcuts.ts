import { shortcut } from "@/utils/shortcut";
import { useEffect } from "react";
import { useHistory } from "./useHistory";
import { useSelectionActions } from "./useSelectionActions";
import { useDocumentActions } from "./useDocumentActions";
import { useEvent } from "./useEvent";

export function useDocumentShortcuts() {
  const { undo, redo } = useHistory();
  const { selectAllBlocks, selectNextBlock, selectPrevBlock } =
    useSelectionActions();
  const { createNewBlock, deleteSelectedBlocks } = useDocumentActions();

  const onKeyDown = useEvent((e: KeyboardEvent) => {
    shortcut(e, ["Ctrl", "Shift", "Z"], redo, true);
    shortcut(e, ["Ctrl", "Shift", "A"], selectAllBlocks, true);
    shortcut(e, ["Shift", "Ctrl", "Backspace"], deleteSelectedBlocks, true);
    shortcut(e, ["Ctrl", "Z"], undo, true);
    shortcut(e, ["Ctrl", "Y"], redo, true);
    shortcut(e, ["Shift", "Tab"], selectPrevBlock, true);
    shortcut(e, ["Tab"], selectNextBlock, true);
    shortcut(e, ["Enter"], createNewBlock, true);
  });

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
}
