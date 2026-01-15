import { nanoid } from "nanoid";
import type {
  MOMEmphasis,
  MOMHeading,
  MOMLink,
  MOMParagraph,
  MOMRoot,
  MOMStrong,
  MOMText,
} from "../model/types";
import { getThematicColor } from "./utils";

export const createRoot = (): MOMRoot => {
  return {
    id: nanoid(),
    type: "root",
    children: [],
  };
};

//Phrases Content
export const createText = (value: MOMText["value"]): MOMText => {
  return {
    id: nanoid(),
    type: "text",
    value,
    // thematicColor: getThematicColor(),
  };
};
export const createStrong = (): MOMStrong => {
  return {
    id: nanoid(),
    type: "strong",
    children: [],
    // thematicColor: getThematicColor(),
  };
};
export const createLink = (): MOMLink => {
  return {
    id: nanoid(),
    type: "link",
    children: [],
    url: "",
    // thematicColor: getThematicColor(),
  };
};
export const createEmphasis = (): MOMEmphasis => {
  return {
    id: nanoid(),
    type: "emphasis",
    children: [],
  };
};

//Flow Content (Blocks)
export const createHeading = (depth: MOMHeading["depth"]): MOMHeading => {
  return {
    id: nanoid(),
    type: "heading",
    depth,
    children: [],
    thematicColor: getThematicColor("heading"),
  };
};
export const createParagraph = (): MOMParagraph => {
  return {
    id: nanoid(),
    type: "paragraph",
    children: [],
    thematicColor: getThematicColor("paragraph"),
  };
};
