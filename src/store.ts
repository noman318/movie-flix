import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const isDevelopment = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(
      apiSlice.middleware
    ),
  devTools: isDevelopment,
});
