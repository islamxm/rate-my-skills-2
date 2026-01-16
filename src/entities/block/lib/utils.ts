import { nanoid } from "nanoid";
import { thematicBlockColors } from "../model/consts";
import type {
  MOMBlocksMap,
  MOMEditableSurfaceElementType,
  MOMElement,
  ThematicColor,
} from "../model/types";

export const getThematicColor = (
  type: MOMEditableSurfaceElementType
): ThematicColor => thematicBlockColors[type];

//проверки должны быть более глубокими а не только типы
export const isHeadingElement = (element?: MOMElement) =>
  element?.type === "heading";
export const isParagraphElement = (element?: MOMElement) =>
  element?.type === "paragraph";
export const isTextElement = (element?: MOMElement) => element?.type === "text";
export const isEmphasisElement = (element?: MOMElement) =>
  element?.type === "emphasis";

// получение массива айдишников элементов к котрым невозможно достучаться из корня document-root для того чтобы потом их удалить из корневого стейта
export const getZombieChildIds = (state: MOMBlocksMap, rootId: string) => {
  const normal = new Set<string>([rootId]);
  const all = Object.keys(state);

  const r = (id: string) => {
    const root = state[id];
    if (root && "children" in root) {
      root.children.forEach((childId) => {
        normal.add(childId);
        r(childId);
      });
    }
  };
  r(rootId);
  return all.filter((f) => !normal.has(f));
};

// получение айдишников прямых детей элементв
export const directDecsOfElement = (nodeElement: Element) => {
  const childNodes = nodeElement.childNodes;
  const newChildrenIds: Array<string> = [];
  childNodes.forEach((childNode) => {
    if (childNode instanceof HTMLElement) {
      const id = childNode.getAttribute("data-id");
      if (id) {
        newChildrenIds.push(id);
      }
    }
  });
  return newChildrenIds;
};

// получение текущей позиции каретки относительно редактируемого блока
export const getCurrentPositionOfCaret = (rootElement: HTMLElement) => {
  const selection = window.getSelection();

  if (!selection) {
    return 0;
  }

  const range = selection.getRangeAt(0);

  // в какой ноде находится курсор
  const careteContainerNode = range.startContainer;
  const caretePositionInContainerNode = range.startOffset;

  // создаем свой range
  const globalRange = document.createRange();
  // начало в родителе
  globalRange.setStart(rootElement, 0);
  //конец там где начинается курсор
  globalRange.setEnd(careteContainerNode, caretePositionInContainerNode);

  // длина - это индекс конца globalRange и начала range
  return globalRange.toString().length;
};

export const setCaretePosition = (node: Node, offset: number) => {
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  const selection = window?.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

// восстановление каретки
export const recoveryCaretePosition = (
  rootElement: HTMLElement,
  globalCaretePos: number
) => {
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT);
  let node:any; // надо типизировать но пока хз как
  let current = 0;
  let result: { offset: number; node: Node | null } = { offset: 0, node: null };

  // интересный способ проверки условия, не знал...
  while ((node = walker.nextNode())) {
    const next = node.length + current;
    if (globalCaretePos <= next) {
      result = {
        offset: globalCaretePos - current,
        node,
      };
      break;
    }
    current = next;
  }

  if (result.node) {
    // const range = document.createRange();
    // range.setStart(result.node, result.offset);
    // range.collapse(true);
    // const selection = window.getSelection();
    // selection?.removeAllRanges();
    // selection?.addRange(range);
    setCaretePosition(result.node, result.offset)
  }
};

export function ensureSingleTextNode(root: HTMLElement) {
  const childNodes = root.childNodes;
  
  //это типа span у которого ничего нет чтобы добавить туда textNode, согласен - громоздко, но пока сойдет
  if(childNodes.length === 1 && childNodes[0].childNodes.length === 0) {
    const textNode = document.createTextNode("\u200B");
    childNodes[0].appendChild(textNode);
  }
}

