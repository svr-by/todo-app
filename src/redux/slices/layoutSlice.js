import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavListOpen: false,
  isTodoModalOpen: false,
  isListModalOpen: false,
  selectedTodoId: null,
  deletedTodoId: null,
  deletedListId: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setNavListOpen(state, action) {
      state.isNavListOpen = action.payload;
    },
    setTodoModalOpen(state, action) {
      state.isTodoModalOpen = action.payload;
    },
    setListModalOpen(state, action) {
      state.isListModalOpen = action.payload;
    },
    setSelectedTodoId(state, action) {
      state.selectedTodoId = action.payload;
    },
    requestTodoDeletion(state, action) {
      state.isTodoModalOpen = true;
      state.deletedTodoId = action.payload;
    },
    rejectTodoDeletion(state) {
      state.isTodoModalOpen = false;
      state.deletedTodoId = null;
    },
    requestListDeletion(state, action) {
      state.isListModalOpen = true;
      state.deletedListId = action.payload;
    },
    rejectListDeletion(state) {
      state.isListModalOpen = false;
      state.deletedListId = null;
    },
  },
});

export default layoutSlice.reducer;
export const {
  setNavListOpen,
  setTodoModalOpen,
  setListModalOpen,
  setSelectedTodoId,
  requestTodoDeletion,
  rejectTodoDeletion,
  requestListDeletion,
  rejectListDeletion,
} = layoutSlice.actions;
