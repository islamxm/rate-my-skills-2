import type {
  ThematicColor,
  MOMEditableSurfaceElementType,
  MOMElement,
} from "./types";

export const thematicBlockColors: Record<
  MOMEditableSurfaceElementType,
  ThematicColor
> = {
  heading: {
    bg: "",
    main: "",
    accent: "",
  },
  paragraph: {
    bg: "",
    main: "",
    accent: "",
  },
};

export const parentElementsMap: Partial<Record<MOMElement["type"], MOMElement["type"]>> = {
  "emphasis": "emphasis",
}
export const literalElementsMap: Partial<Record<MOMElement["type"], MOMElement["type"]>> = {
  "text": "text"
}

