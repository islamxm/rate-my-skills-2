import type { MOMElement } from "../../block";

export const isRootElement = (element?: MOMElement) => element?.type === "root";
