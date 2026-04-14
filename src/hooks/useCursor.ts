import { MOM } from "@/mom";
import type { CursorPosition } from "@/mom/editor/editor.types";
import { useRef, type RefObject } from "react";

export function useCursor<T extends HTMLElement>(elementRef: RefObject<T | null>) {
  const cursorRef = useRef<CursorPosition>(null);
  const saveCursor = () => {
    if (!elementRef?.current) return;
    // console.log("save cursor")
    cursorRef.current = MOM.Editor.saveCursor(elementRef.current);
  };

  const restoreCursor = () => {
    if (!elementRef?.current) return;
    // console.log("restore cursor")
    MOM.Editor.restoreCursor(elementRef.current, cursorRef.current);
  };

  return {
    saveCursor,
    restoreCursor,
  };
}
