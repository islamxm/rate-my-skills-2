import { shortcut, GlobalShortcuts } from "@/utils";
import { useEffect } from "react";
import { useHistory } from "./useHistory";
import { useSelectionActions } from "./useSelectionActions";
import { useDocumentActions } from "./useDocumentActions";
import { useEvent } from "./useEvent";

export function useDocumentShortcuts() {
  const { undo, redo } = useHistory();
  const { selectAllBlocks, selectNextBlock, selectPrevBlock } = useSelectionActions();
  const { createNewBlock, deleteSelectedBlocks } = useDocumentActions();

  const onKeyDown = useEvent((e: KeyboardEvent) => {
    shortcut(e, GlobalShortcuts.REDO, redo, true);
    shortcut(e, GlobalShortcuts.SELECT_ALL_BLOCKS, selectAllBlocks, true);
    shortcut(e, GlobalShortcuts.DELETE_SELECTED_BLOCKS, deleteSelectedBlocks, true);
    shortcut(e, GlobalShortcuts.UNDO, undo, true);
    shortcut(e, GlobalShortcuts.REDO_LEGACY, redo, true);
    shortcut(e, GlobalShortcuts.SELECT_PREV_BLOCK, selectPrevBlock, true);
    shortcut(e, GlobalShortcuts.SELECT_NEXT_BLOCK, selectNextBlock, true);
    shortcut(e, GlobalShortcuts.CREATE_NEW_BLOCK, createNewBlock, true);
  });

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
}
