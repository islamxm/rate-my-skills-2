import type { MOMDocument } from "@/mom/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  selectedIds: Array<string>;
  focusedId: string | null;
};

const initialState: InitialState = {
  selectedIds: [],
  focusedId: null,
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectNode: (state, action: PayloadAction<string>) => {
      state.selectedIds = [action.payload];
    },
    addToSelection: (state, action: PayloadAction<string>) => {
      if (!state.selectedIds.includes(action.payload)) {
        state.selectedIds.push(action.payload);
        state.focusedId = null;
      }
    },
    selectBatch: (state, action: PayloadAction<MOMDocument["nodes"]>) => {
      state.selectedIds = Object.entries(action.payload).map(([_, v]) => v.id);
    },
    removeFromSelection: (state, action: PayloadAction<string>) => {
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload,
      );
      state.focusedId = null;
    },
    clearSelection: (state) => {
      state.selectedIds = [];
      state.focusedId = null;
    },
    focusNode: (state, action: PayloadAction<string>) => {
      state.focusedId = action.payload;
    },
    blurNode: (state) => {
      state.focusedId = null;
    },
  },
});

export const selectionStoreActions = selectionSlice.actions;
