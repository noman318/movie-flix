import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import searchSliceReducer from "./slices/searchSlice";

const isDevelopment = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(
      apiSlice.middleware
    ),
  devTools: isDevelopment,
});
