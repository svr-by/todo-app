import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import lists from './slices/listsSlice';
import todos from './slices/todosSlice';
import layout from './slices/layoutSlice';

export const store = configureStore({
  reducer: {
    user,
    lists,
    todos,
    layout,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
