import { configureStore } from "@reduxjs/toolkit";
import { blockStore } from "../../../entities/block";

export function createStore() {
  return configureStore({
    reducer: {
      [blockStore.reducerPath]: blockStore.reducer,      
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }),
  });
}

export const store = createStore();

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
