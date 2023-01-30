import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as firebaseApi from '../../firebase/api';

const initialState = {
  lists: [],
  isLoading: false,
};

export const getLists = createAsyncThunk('lists/getLists', async (userId) => {
  const lists = await firebaseApi.getCollectionDocs('lists');
  return lists;
});

export const createList = createAsyncThunk('lists/createList', async (listData, userId) => {
  const list = await firebaseApi.createDoc('lists', { ...listData, created: Date.now() });
  return list;
});

export const deleteList = createAsyncThunk('lists/deleteList', async (listId, userId) => {
  let listTodos = await firebaseApi.getEqualToDocs('todos', 'listId', listId);
  for (let todo of listTodos) {
    firebaseApi.deleteDocById('todos', todo.id);
  }
  await firebaseApi.deleteDocById('lists', listId);
  return listId;
});

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLists.fulfilled, (state, action) => {
        state.lists = [...action.payload];
        state.isLoading = false;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
        state.isLoading = false;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getLists.pending, createList.pending, deleteList.pending), (state) => {
        state.isLoading = true;
      });
  },
});

export default listsSlice.reducer;
