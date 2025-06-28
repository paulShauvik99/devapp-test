import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import themeReducer from './slice/themeSlice'
import developersReducer from './slice/developerSlice'
import blogsReducer from './slice/blogSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    developers: developersReducer,
    blogs: blogsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch