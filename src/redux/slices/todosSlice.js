import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as firebaseApi from '../../api/api';

const initialState = {
  todos: [],
  isLoading: false,
};

export const getMainTodos = createAsyncThunk('todos/getMainTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'listId', '', userId);
  return todos;
});

export const getListTodos = createAsyncThunk('todos/getListTodos', async ({ listId, userId }) => {
  let todos = listId ? await firebaseApi.getEqualToDocs('todos', 'listId', listId, userId) : [];
  return todos;
});

export const getFavoriteTodos = createAsyncThunk('todos/getFavoriteTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'favorite', true, userId);
  return todos;
});

export const getPlannedTodos = createAsyncThunk('todos/getPlannedTodos', async (userId) => {
  const todos = await firebaseApi.getNotEqualDocs('todos', 'dueDate', false, userId);
  return todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (data) => {
  try {
    const todo = await firebaseApi.createDoc('todos', {
      created: Date.now(),
      completed: false,
      favorite: false,
      dueDate: null,
      description: '',
      ...data,
    });
    return todo;
  } catch (error) {
    toast.error(`There was an error!`);
    console.log(err);
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ todoId, todoData }) => {
  try {
    await firebaseApi.updateDocById('todos', todoId, todoData);
    return { todoId, todoData };
  } catch (error) {
    toast.error(`There was an error!`);
    console.log(err);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  try {
    await firebaseApi.deleteDocById('todos', todoId);
    toast.success(`Todo was deleted!`);
    return todoId;
  } catch (err) {
    toast.error(`There was an error!`);
    console.log(err);
  }
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
      )
      .addMatcher(
        isAnyOf(
          getMainTodos.rejected,
          getListTodos.rejected,
          getFavoriteTodos.rejected,
          getPlannedTodos.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default todosSlice.reducer;
