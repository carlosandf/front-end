import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./slices/clients";
import modalReducer from "./slices/modal";

const store = configureStore({
  reducer: {
    clientsState: clientsReducer,
    openModal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;