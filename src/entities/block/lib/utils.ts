import { thematicBlockColors } from "../model/consts";
import type {
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
