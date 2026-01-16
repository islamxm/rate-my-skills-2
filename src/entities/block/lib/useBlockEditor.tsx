import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
} from "react";
import { useDispatch, useSelector } from "../../../shared/lib";
import { blockStoreActions } from "../model/store";
import { parseDOMtoMOM } from "./parseHTMLtoMOM";
import {
  directDecsOfElement,
  ensureSingleTextNode,
  getCurrentPositionOfCaret,
  recoveryCaretePosition,
} from "./utils";
import { nanoid } from "nanoid";
import { createText } from "./fabrics";

type Options = {
  elementId: string;
};

const defaultEditableBlockProps: HTMLAttributes<HTMLElement> = {
  contentEditable: true,
  suppressContentEditableWarning: true,
};

export const useBlockEditor = ({ elementId }: Options) => {
  const containerRef = useRef<HTMLElement>(null);
  const caretPositionRef = useRef<number>(0);
  const dispatch = useDispatch();
  const targetElement = useSelector((s) => s.blocksStore.blocks[elementId]);

  const onInput = (e: ChangeEvent) => {
    console.log("change event");
    if (!targetElement || !("children" in targetElement)) {
      return;
    }

    // сохраняем позицию каретки
    if (containerRef.current) {
      caretPositionRef.current = getCurrentPositionOfCaret(
        containerRef.current
      );
    }

    const newBlocks = parseDOMtoMOM(e.target);
    const newChildren = directDecsOfElement(e.target);

    if (Object.entries(newBlocks).length === 0) {
      const newText = createText("", nanoid());

      dispatch(
        blockStoreActions.updateSurfaceBlock({
          [elementId]: {
            ...targetElement,
            children: [newText.id],
            version: nanoid(),
          },
          [newText.id]: newText,
        })
      );
    } else {
      dispatch(
        blockStoreActions.updateSurfaceBlock({
          [elementId]: {
            ...targetElement,
            children: newChildren,
            version: nanoid(),
          },
          ...newBlocks,
        })
      );
    }
    dispatch(blockStoreActions.deleteZombieChilds());
  };

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }
    root.focus();
    ensureSingleTextNode(root)
    recoveryCaretePosition(root, caretPositionRef.current);
  }, [targetElement.version]);

  return {
    containerRef,
    surfaceProps: {
      onInput,
      ...defaultEditableBlockProps,
    } as HTMLAttributes<HTMLElement>,
  };
};
