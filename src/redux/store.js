import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import lists from './slices/listsSlice';
import todos from './slices/todosSlice';

export const store = configureStore({
  reducer: {
    user,
    lists,
    todos,
  },
});
