import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as firebaseApi from '../../api/api';

const initialState = {
  lists: [],
  isLoading: false,
};

export const getLists = createAsyncThunk('lists/getLists', async (userId) => {
  const lists = await firebaseApi.getEqualToDocs('lists', 'userId', userId);
  return lists.sort((a, b) => a.created - b.created);
});

export const createList = createAsyncThunk('lists/createList', async (listData) => {
  const list = await firebaseApi.createDoc('lists', { ...listData, created: Date.now() });
  return list;
});

export const deleteList = createAsyncThunk('lists/deleteList', async (listId) => {
  let listTodos = await firebaseApi.getEqualToDocs('todos', 'listId', listId);
  for (let todo of listTodos) {
    firebaseApi.deleteDocById('todos', todo.id);
  }
  await firebaseApi.deleteDocById('lists', listId);
  toast.success(`List was deleted!`);
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
      })
      .addMatcher(isAnyOf(getLists.rejected, createList.rejected, deleteList.rejected), (state) => {
        state.isLoading = false;
      });
  },
});

export default listsSlice.reducer;
