import { useEffect, useRef } from "react";

const DRAGGRABLE_ELEMENT_DOM_SELECTOR = "[data-block]";
const DRAG_BUTTON_DOM_SELECTOR = "[data-drag]";
const BODY_CSS_CLASS = "markdown-body";
const BLOCK_TRANSITION_DURATION = 0.2;

const createPortal = () => {
  const portal = document.createElement("div");

  const mask = document.createElement("div");

  mask.style.position = "fixed";
  mask.style.inset = "0";
  mask.style.background = "transparent";
  mask.style.zIndex = "999";
  // mask.style.pointerEvents = "auto";
  document.body.style.userSelect = "none";

  portal.classList.add(BODY_CSS_CLASS);

  portal.append(mask);
  document.body.append(portal);

  return { portal, mask };
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  mt: number;
  mb: number;
};

type Block = {
  el: HTMLElement;
  bounds: Rect;
};

export function useDrag_proto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDragStarted = useRef(false);

  const ghostBlockData = useRef<{
    el: HTMLElement;
    initialMousePos: { x: number; y: number };
  }>(null);
  const originalBlockData = useRef<{
    el: HTMLElement;
    index: number;
    initialBounds: Rect;
  }>(null);

  const portal = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const blocks = useRef<Array<Block>>([]);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);
  const dropIndex = useRef(-1);

  const startDrag = (e: PointerEvent) => {
    if (
      !(
        e.target instanceof HTMLElement &&
        e.target.closest(DRAG_BUTTON_DOM_SELECTOR)
      )
    )
      return;
    const dragButton = e.target.closest(DRAG_BUTTON_DOM_SELECTOR);
    if (dragButton instanceof HTMLElement) {
      dragButton.style.opacity = "1";
    }
    const targetEl = e.target.closest(DRAGGRABLE_ELEMENT_DOM_SELECTOR);
    if (!targetEl || !(targetEl instanceof HTMLElement)) return;

    isDragStarted.current = true;

    blocks.current = Array.from(
      containerRef.current?.querySelectorAll(DRAGGRABLE_ELEMENT_DOM_SELECTOR) ??
        [],
    )
      .filter((el) => el instanceof HTMLElement)
      .map((el) => {
        const { width, height, x, y } = el.getBoundingClientRect();
        const styles = getComputedStyle(el);
        const mt = parseFloat(styles.marginTop);
        const mb = parseFloat(styles.marginBottom);
        return {
          el,
          bounds: {
            width,
            height,
            x,
            y,
            mt,
            mb,
          },
        };
      });

    const originalIndex = blocks.current.findIndex(
      (block) => block.el === targetEl,
    );
    const originalBounds = targetEl.getBoundingClientRect();
    const originalStyles = getComputedStyle(targetEl);
    const mt = parseFloat(originalStyles.marginTop);
    const mb = parseFloat(originalStyles.marginBottom);
    originalBlockData.current = {
      el: targetEl,
      index: originalIndex,
      initialBounds: {
        height: originalBounds.height,
        width: originalBounds.width,
        x: originalBounds.x,
        y: originalBounds.y,
        mt,
        mb,
      },
    };
    originalBlockData.current.el.style.opacity = "0";
    containerRef.current?.setPointerCapture(e.pointerId);

    const clone = originalBlockData.current.el.cloneNode(true);
    if (!(clone instanceof HTMLElement)) return;

    ghostBlockData.current = {
      el: clone,
      initialMousePos: {
        x: e.clientX,
        y: e.clientY,
      },
    };

    const { el: ghostEl } = ghostBlockData.current;

    ghostEl.style.opacity = "0.5";
    ghostEl.style.position = "fixed";
    ghostEl.style.zIndex = "1000";
    ghostEl.style.margin = "0";
    ghostEl.style.top = `${originalBounds.top}px`;
    ghostEl.style.left = `${originalBounds.left}px`;
    ghostEl.style.width = `${originalBounds.width}px`;
    ghostEl.style.height = `${originalBounds.height}px`;
    ghostEl.style.transform = `translate3d(${0}px, ${0}px, 0)`;
    ghostEl.style.willChange = "transform";
    ghostEl.style.pointerEvents = "none";
    ghostEl.style.touchAction = "none";

    const { mask: maskEl, portal: portalEl } = createPortal();
    portal.current = portalEl;
    portal.current.append(ghostEl);
    mask.current = maskEl;
  };

  const drag = (e: PointerEvent) => {
    if (!(isDragStarted.current && ghostBlockData.current)) {
      return;
    }

    mouseCoords.current = { x: e.clientX, y: e.clientY };
    if (ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      if (!isDragStarted.current || !ghostBlockData.current) {
        ticking.current = false;
        return;
      }

      const { initialMousePos, el } = ghostBlockData.current!;
      const { y: pointerClientY, x: pointerClientX } = mouseCoords.current;
      const y = pointerClientY - initialMousePos.y;

      if (mask.current && originalBlockData.current) {
        mask.current.style.pointerEvents = "none";
        const currentBlock = document
          .elementFromPoint(pointerClientX, pointerClientY)
          ?.closest(DRAGGRABLE_ELEMENT_DOM_SELECTOR);
        
        // новая логика драга

      }
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      ticking.current = false;
    });
  };

  const endDrag = (e: PointerEvent) => {
    isDragStarted.current = false;
    commitDrop();
  };

  const commitDrop = () => {
    // ghostBlockData.current?.el.addEventListener(
    //   "transitionend",
    //   cleanUpAfterDrag,
    //   {
    //     once: true,
    //   },
    // );
  };

  const revertDrop = () => {};

  const applyDrag = () => {};

  const cleanUpAfterDrag = () => {
    isDragStarted.current = false;
    // portal.current?.remove();
    ticking.current = false;
    mouseCoords.current = { x: 0, y: 0 };
    originalBlockData.current = null;
    ghostBlockData.current = null;
    dropIndex.current = -1;
    // mask.current = null;
    // portal.current = null;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ref = containerRef.current;

    ref.addEventListener("pointerdown", startDrag);
    document.addEventListener("pointermove", drag);
    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);

    return () => {
      ref.removeEventListener("pointerdown", startDrag);
      document.removeEventListener("pointermove", drag);
      document.removeEventListener("pointerup", endDrag);
      document.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return { containerRef };
}
