import { useEffect, useRef } from "react";
import { useSelectionActions } from "./useSelectionActions";

const DRAGGRABLE_ELEMENT_DOM_SELECTOR = "[data-block]";
const DRAG_START_DELAY = 500;
const BODY_CSS_CLASS = "markdown-body";

const createPortal = () => {
  const portal = document.createElement("div");

  const mask = document.createElement("div");

  mask.style.position = "fixed";
  mask.style.inset = "0";
  mask.style.background = "transparent";
  mask.style.zIndex = "999";
  mask.style.pointerEvents = "auto";

  portal.classList.add(BODY_CSS_CLASS);

  portal.append(mask);
  document.body.append(portal);

  return portal;
};

export function useDrag_proto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { blur } = useSelectionActions();

  const dragStartTimer = useRef<any>(null);
  const isDragStarted = useRef(false);
  const nativeTargetElement = useRef<HTMLElement>(null);
  const dragData = useRef<{
    el: HTMLElement;
    initialMousePos: { x: number; y: number };
  }>(null);
  const portal = useRef<HTMLDivElement>(null);
  const dropZoneLine = useRef<HTMLDivElement>(null);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);
  const lastDropZoneSearchTimeInMs = useRef(0);

  const startDrag = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    const targetEl = e.target.closest(DRAGGRABLE_ELEMENT_DOM_SELECTOR);
    if (!targetEl || !(targetEl instanceof HTMLElement)) return;
    clearDragStartTimer();
    dragStartTimer.current = setTimeout(() => {
      isDragStarted.current = true;
      targetEl.style.opacity = "0";
      targetEl.setPointerCapture(e.pointerId);
      nativeTargetElement.current = targetEl;
      const clone = nativeTargetElement.current.cloneNode(true);
      if (!(clone instanceof HTMLElement)) return;

      const bounds = nativeTargetElement.current.getBoundingClientRect();

      dragData.current = {
        el: clone,
        initialMousePos: {
          x: e.clientX,
          y: e.clientY,
        },
      };

      dragData.current.el.style.opacity = "0.5";
      dragData.current.el.style.position = "fixed";
      dragData.current.el.style.zIndex = "1000";
      dragData.current.el.style.margin = "0";
      dragData.current.el.style.top = `${bounds.top}px`;
      dragData.current.el.style.left = `${bounds.left}px`;
      dragData.current.el.style.width = `${bounds.width}px`;
      dragData.current.el.style.height = `${bounds.height}px`;
      dragData.current.el.style.transform = `translate3d(${0}px, ${0}px, 0)`;
      dragData.current.el.style.willChange = "transform";
      dragData.current.el.style.pointerEvents = "none";
      dragData.current.el.style.touchAction = "none";

      portal.current = createPortal();
      portal.current.append(dragData.current.el);

      blur();
    }, DRAG_START_DELAY);
  };

  const endDrag = (e: PointerEvent) => {
    clearDragStartTimer();
    if (!isDragStarted.current) return;
    isDragStarted.current = false;
    dropZoneLine.current?.remove();
    dropZoneLine.current = null;
    returnDrag();
  };

  const drag = (e: PointerEvent) => {
    if (!isDragStarted.current || !dragData.current) {
      clearDragStartTimer();
      return;
    }

    mouseCoords.current = { x: e.clientX, y: e.clientY };
    if (ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      const { initialMousePos, el } = dragData.current!;
      const { x: pointerClientX, y: pointerClientY } = mouseCoords.current;
      const x = pointerClientX - initialMousePos.x;
      const y = pointerClientY - initialMousePos.y;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const canSearchDropZone =
        Date.now() - lastDropZoneSearchTimeInMs.current > 60;

      if (canSearchDropZone) {
        const overs = document.elementsFromPoint(
          pointerClientX,
          pointerClientY,
        );

        const dropAfterEl = overs.find(
          (o) =>
            o !== nativeTargetElement.current &&
            o instanceof HTMLElement &&
            o.dataset.block,
        );

        if (dropAfterEl && dropAfterEl instanceof HTMLElement) {
          if (dropAfterEl !== nativeTargetElement.current) {
            if (dropZoneLine.current) {
              const { top, height } = dropAfterEl.getBoundingClientRect();
              dropZoneLine.current.style.top = `${top + height}px`;
            } else {
              createDropZoneLine(dropAfterEl);
            }
          } else {
            dropZoneLine.current?.remove();
            dropZoneLine.current = null;
          }
        }

        lastDropZoneSearchTimeInMs.current = Date.now();
      }

      ticking.current = false;
    });
  };

  const returnDrag = () => {
    if (!nativeTargetElement.current || !dragData?.current?.el) return;
    dragData.current.el.addEventListener(
      "transitionend",
      (e: TransitionEvent) => {
        if (e.propertyName !== "transform" || !nativeTargetElement.current)
          return;
        nativeTargetElement.current.style.opacity = "1";
        cleanUpAfterDrag();
      },
      { once: true },
    );
    dragData.current.el.style.transition =
      "transform .4s cubic-bezier(0.2, 0, 0, 1)";
    dragData.current.el.style.transform = "translate3d(0,0,0)";
  };

  const applyDrag = () => {};

  const createDropZoneLine = (target: HTMLElement) => {
    const { width, top, left, height } = target.getBoundingClientRect();
    const dropLine = document.createElement("div");
    dropLine.style.height = "4px";
    dropLine.style.backgroundColor = "#2C7FFF";
    dropLine.style.position = "fixed";
    dropLine.style.top = `${top + height}px`;
    dropLine.style.left = `${left - 5}px`;
    dropLine.style.width = `${width + 10}px`;
    dropLine.style.borderRadius = "4px";
    dropZoneLine.current = dropLine;
    containerRef.current?.append(dropLine);
  };

  const clearDragStartTimer = () => {
    if (dragStartTimer.current) {
      clearTimeout(dragStartTimer.current);
      dragStartTimer.current = null;
    }
  };

  const cleanUpAfterDrag = () => {
    clearDragStartTimer();
    isDragStarted.current = false;
    portal.current?.remove();
    nativeTargetElement.current = null;
    dragData.current = null;
    ticking.current = false;
    mouseCoords.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ref = containerRef.current;

    ref.addEventListener("pointerdown", startDrag);
    ref.addEventListener("pointerup", endDrag);
    ref.addEventListener("pointermove", drag);

    return () => {
      ref.removeEventListener("pointerdown", startDrag);
      ref.removeEventListener("pointerup", endDrag);
      ref.removeEventListener("pointermove", drag);
    };
  }, []);

  return { containerRef };
}
