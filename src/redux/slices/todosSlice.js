import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as firebaseApi from '../../firebase/api';

const initialState = {
  todos: [],
  isLoading: false,
};

export const getMainTodos = createAsyncThunk('todos/getMainTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'listId', '');
  return todos;
});

export const getListTodos = createAsyncThunk('todos/getListTodos', async (listId, userId) => {
  let todos = listId ? await firebaseApi.getEqualToDocs('todos', 'listId', listId) : [];
  return todos;
});

export const getFavoriteTodos = createAsyncThunk('todos/getFavoriteTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'favorite', true);
  return todos;
});

export const getPlannedTodos = createAsyncThunk('todos/getPlannedTodos', async (userId) => {
  const todos = await firebaseApi.getNotEqualDocs('todos', 'dueDate', false);
  return todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (data) => {
  const todo = await firebaseApi.createDoc('todos', {
    created: Date.now(),
    completed: false,
    favorite: false,
    dueDate: null,
    description: '',
    ...data,
  });
  return todo;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data) => {
  const { todoId, todoData } = data;
  await firebaseApi.updateDocById('todos', todoId, todoData);
  return data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  await firebaseApi.deleteDocById('todos', todoId);
  return todoId;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainTodos.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getListTodos.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getFavoriteTodos.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.isLoading = false;
      })
      .addCase(getPlannedTodos.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.isLoading = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.todoId ? { ...todo, ...action.payload.todoData } : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          getMainTodos.pending,
          getListTodos.pending,
          getFavoriteTodos.pending,
          getPlannedTodos.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export default todosSlice.reducer;
