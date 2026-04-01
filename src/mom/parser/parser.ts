import { nanoid } from "nanoid";
import type { MOMAllContent, MOMNodeType, MOMText } from "../types";
import { MOM } from "..";

/** получает редактируемый блок и парсит его содержимое из DOM в MOM */
export function domToMom(
  element?: HTMLElement | null,
  _removeUnnecessaryNodesFromDom: boolean = true,
) {
  if (!element) return [];
  const result: Array<MOMAllContent> = [];
  const parentId = element?.getAttribute("data-id");
  const children = element.childNodes;
  const unnecessaryNodesForRemove: Array<ChildNode> = [];

  for (const child of children) {
    if (child.nodeName === "BR") {
      unnecessaryNodesForRemove.push(child);
      continue;
    }
    if (child.nodeType === Node.TEXT_NODE) {
      const value = child.textContent ?? "";
      if (!value.trim()) {
        unnecessaryNodesForRemove.push(child);
        continue;
      }
      result.push(MOM.Engine.createText(value, parentId));
      unnecessaryNodesForRemove.push(child);
      continue;
    }
    if (child instanceof HTMLElement) {
      const node = parseSpanToMOM(child, parentId);
      if (node) result.push(node);
    }
  }
  if (_removeUnnecessaryNodesFromDom) {
    //удаляем лишние DOM ноды
    unnecessaryNodesForRemove.forEach((node) => node?.remove?.());
  }
  return result;
}

function parseSpanToMOM(element: HTMLElement, parentId: string | null) {
  const id = momDataOfElement(element).id || nanoid();
  const value = element.textContent || "";
  const url = element.getAttribute("data-url");

  const marks: MOMText["marks"] = {
    bold: element.dataset.bold === "true",
    italic: element.dataset.italic === "true",
    lineThrough: element.dataset.linethrough === "true",
    link: element.dataset.link === "true",
  };

  if (url) {
    return {
      ...MOM.Engine.createText(value, parentId),
      id,
      marks,
      url,
    };
  }
  return {
    ...MOM.Engine.createText(value, parentId),
    id,
    marks,
  };
}

/** нужно использовать во всех местах где получаем доступ к общим метаданным связанным с MOM */
function momDataOfElement(element: Element) {
  const id = element.getAttribute("data-id") as string;
  const type = element.getAttribute("data-type") as MOMNodeType;
  const parentId = element.getAttribute("data-parent-id");

  return { id, type, parentId };
}

/** очистка от мусора который создает браузер через свой модуль exec, возможно придется доработать потому что могут возникнуть edge cases */
function sanitizeHtml(element: HTMLElement) {
  if (element.childNodes.length === 0) return;
  for (const child of element.childNodes) {
    if (child instanceof HTMLElement) {
      if (MOM.Guard.isValidHtmlElement(child)) {
        child.textContent = child.textContent;
      } else {
        child.replaceWith(child.textContent);
      }
    }
  }
}

export const Parser = {
  domToMom,
  momDataOfElement,
  sanitizeHtml,
} as const;
