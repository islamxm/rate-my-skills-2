import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MOMElement, MOMHeading } from "./types";
import { nanoid } from "nanoid";
import { ROOT_ELEMENT_ID } from "../../document";
import { isRootElement } from "../../document/lib/utils";

type InitialState = {
  blocks: Record<string, MOMElement>;
  blockOrders: Array<string>;
}

const initialState:InitialState = {
  blocks: {
    "document-root": {
      id: "document-root",
      type: "root",
      children: ["test-h1-id"],
    },
    "test-h1-id": {
      id: "test-h1-id",
      type: "heading",
      depth: 1,
      children: ["test-text-id", "test-emph-id"],
    },
    "test-text-id": {
      id: "test-text-id",
      type: "text",
      value: "Привет, ",
    },
    "test-emph-id": {
      id: "test-emph-id",
      type: "emphasis",
      children: ["test-text-id-2"],
    },
    "test-text-id-2": {
      id: "test-text-id-2",
      type: "text",
      value: "мир!",
    },
  },
  blockOrders: []
}

export const blockStore = createSlice({
  name: "blocksStore",
  initialState,
  reducers: {
    addHeadingElement: (state, {payload}: PayloadAction<MOMHeading>) => {
      const root = state.blocks[ROOT_ELEMENT_ID];
      if(isRootElement(root)) {
        state.blocks[payload.id] = payload;
        root.children.push(payload.id);
      }
    }
  }
})

export const blockStoreActions = blockStore.actions;