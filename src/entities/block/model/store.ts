import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MOMBlocksMap, MOMElement, MOMHeading } from "./types";
import { ROOT_ELEMENT_ID } from "../../document";
import { isRootElement } from "../../document/lib/utils";
import { getZombieChildIds } from "../lib/utils";
import { nanoid } from "nanoid";

type InitialState = {
  blocks: MOMBlocksMap;
  blockOrders: Array<string>;
};

const initialState: InitialState = {
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
      // children: ["test-text-id", "test-emph-id", "test-text-end"],
      children: ["test-text-id", "test-text-end"],
      version: nanoid(),
    },
    "test-text-id": {
      id: "test-text-id",
      type: "text",
      value: "Test ",
    },
    "test-text-end": {
      id: "test-text-end",
      type: "text",
      value: "end",
    },
    // "test-emph-id": {
    //   id: "test-emph-id",
    //   type: "emphasis",
    //   children: ["test-text-id-2"],
    // },
    // "test-text-id-2": {
    //   id: "test-text-id-2",
    //   type: "text",
    //   value: "editor",
    // },
  },
  blockOrders: [],
};

export const blockStore = createSlice({
  name: "blocksStore",
  initialState,
  reducers: {
    addHeadingElement: (state, { payload }: PayloadAction<MOMHeading>) => {
      const root = state.blocks[ROOT_ELEMENT_ID];
      if (isRootElement(root)) {
        state.blocks[payload.id] = payload;
        root.children.push(payload.id);
      }
    },
    updateElement: (state, { payload }: PayloadAction<MOMElement>) => {
      state.blocks[payload.id] = payload;
    },
    updateSurfaceBlock: (state, { payload }: PayloadAction<MOMBlocksMap>) => {
      // Object.assign(state.blocks, payload);
      state.blocks = { ...state.blocks, ...payload };
    },
    deleteZombieChilds: (state) => {
      const zombies = getZombieChildIds(state.blocks, ROOT_ELEMENT_ID);
      zombies.forEach((zombieId) => delete state.blocks[zombieId]);
    },
    deleteSurfaceBlock: (state, { payload }: PayloadAction<string>) => {
      if (state.blocks[payload]) {
        delete state.blocks[payload];
      }
    },
  },
});

export const blockStoreActions = blockStore.actions;
