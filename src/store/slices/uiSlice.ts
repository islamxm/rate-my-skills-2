import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  blockHighlighting: boolean;
};
const initialState: InitialState = {
  blockHighlighting: true
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    enableBlockHighlighting: (state) => {state.blockHighlighting = true},
    disableBlockHighlighting: (state) => {state.blockHighlighting = false}
  }
})

export const uiStoreActions = uiSlice.actions;