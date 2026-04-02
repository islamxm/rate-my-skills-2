import { useRef, type HTMLProps, useEffect } from "react";
import { useNode } from "./useNode";
import { useDocument } from "./useDocument";
import { useSelection } from "./useSelection";
import { MOM } from "../mom";
import type { MOMAllContent, MOMTextMarks } from "../mom/types";
import { useChildren } from "./useChildren";

export function useListEditor(
  nodeId: string,
  listNodeId: string,
  children: Array<MOMAllContent>,
  index: number,
  createItem?: any,
  deleteItem?: any,
  focusItem?: any,
) {
  const parentChildren = useChildren(listNodeId);
  const cursorRef = useRef<any>(null);
  const { commitInlineEdit } = useDocument();
  const { isFocused } = useSelection();
  const ref = useRef<HTMLLIElement>(null);
  const focused = isFocused(nodeId);

  useEffect(() => {
    if (focused && ref.current) {
      // ref.current.focus();
    }
  }, [focused]);

  /** берем управление DOM в свои руки чтобы не было ошибки c [React]removeChildren() */
  useEffect(() => {
    if (!ref.current) return;
    const html = MOM.Serializer.momToHTML(children, nodeId);
    ref.current.innerHTML = html;
  }, [children]);

  const save = () => {
    if (!ref.current) return;
    // cursorRef.current = saveCursor(ref.current);
    const nodes = MOM.Parser.domToMom(ref.current);
    commitInlineEdit({ nodeId, nodes });
  };

  const onBlur = () => {
    save();
  };

  const applyFormat = (format: keyof MOMTextMarks) => {
    if (!ref.current) return;
    const result = MOM.Editor.applyFormat(format, children);
    if (!result) return;
    commitInlineEdit({ nodeId, nodes: result.nodes });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      createItem();
      return;
    }
    if (e.key === "Backspace") {
      const isEmpty = !ref.current?.textContent;
      if (isEmpty) {
        deleteItem();
      }
    }
    if (e.key === "ArrowUp") {
      focusItem(index - 1);
    }
    if (e.key === "ArrowDown") {
      focusItem(index + 1);
    }
  };

  const editorProps: HTMLProps<HTMLLIElement> = {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur,
    onKeyDown,
  };

  return {
    ref,
    editorProps,
    applyFormat,
  };
}
