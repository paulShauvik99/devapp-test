import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import blogReducer from "./slice/blogSlice";
import developerReducer from "./slice/userSlice";
import themeReducer from "./slice/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    developers: developerReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
