import type { MOMHtml } from "@/mom/types";
import { useEffect, useRef, useState } from "react";
import { useDocumentActions } from "./useDocumentActions";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import { useSelectionActions } from "./useSelectionActions";
import { useNodeSelection } from "./useNodeSelection";

export function useHtml(node: MOMHtml) {
  const { updateNode, removeNode } = useDocumentActions();
  const { selectPrevBlock, selectNextBlock, removeFromSelect } =
    useSelectionActions();
  const { isSelected } = useNodeSelection(node.id);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(node.value);

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const save = () => {
    updateNode<MOMHtml>({
      nodeId: node.id,
      patch: {
        id: node.id,
        value,
        type: "html",
        parentId: node.parentId,
      },
    });
  };

  const blur = () => {
    if (!ref.current) return;
    ref.current.blur();
  };

  const onBlur = () => {
    save();
    blur();
    removeFromSelect(node.id);
  };

  const onPaste = () => {};

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.shiftKey) {
      switch (e.code) {
        case "Tab":
          e.preventDefault();
          onBlur();
          selectPrevBlock(node.id);
          break;
      }
      return;
    }
    if (e.code === "Tab") {
      e.preventDefault();
      onBlur();
      selectNextBlock(node.id);
      return;
    }
    if (e.code === "Backspace") {
      const isEmpty = !ref.current?.value;
      if (isEmpty) {
        selectPrevBlock(node.id);
        removeNode(node.id);
      }
      return;
    }
  };

  useEffect(() => {
    const onWrapKeydown = (e: KeyboardEvent) => {
      if (!isSelected) return;
      if (e.shiftKey) {
        switch (e.code) {
          case "Tab":
            e.preventDefault();
            onBlur();
            selectPrevBlock(node.id);
            break;
        }
        return;
      }
      if (e.code === "Tab") {
        e.preventDefault();
        onBlur();
        selectNextBlock(node.id);
        return;
      }
    };
    document.addEventListener("keydown", onWrapKeydown);

    return () => {
      document.removeEventListener("keydown", onWrapKeydown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected, node.id, selectPrevBlock, selectNextBlock]);

  const fieldProps: TextareaAutosizeProps = {
    value,
    onChange: onValueChange,
    placeholder: "...",
    minRows: 1,
    onKeyDown,
    spellCheck: false,
    tabIndex: -1,
    onPaste,
  };

  return {
    ref,
    fieldProps,
  };
}
