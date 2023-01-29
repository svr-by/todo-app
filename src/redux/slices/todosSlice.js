import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  isLoading: false,
};

export const getMainTodos = createAsyncThunk('lists/getMainTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'listId', '');
  return todos;
});

export const getListTodos = createAsyncThunk('lists/getListTodos', async (listId, userId) => {
  let todos = listId ? await firebaseApi.getEqualToDocs('todos', 'listId', listId) : [];
  return todos;
});

export const getFavoriteTodos = createAsyncThunk('lists/getFavoriteTodos', async (userId) => {
  const todos = await firebaseApi.getEqualToDocs('todos', 'favorite', true);
  return todos;
});

export const getPlannedTodos = createAsyncThunk('lists/getPlannedTodos', async (userId) => {
  const todos = await firebaseApi.getNotEqualDocs('todos', 'dueDate', false);
  return todos;
});

export const createTodo = createAsyncThunk('lists/createTodo', async (todoData, userId) => {
  const todo = await firebaseApi.createDoc('todos', { ...todoData, created: Date.now() });
  return todo;
});

export const updateTodo = createAsyncThunk('lists/updateTodo', async (todoId, todoData, userId) => {
  await firebaseApi.updateDocById('todos', todoId, todoData);
  return { todoId, todoData };
});

export const deleteTodo = createAsyncThunk('lists/deleteTodo', async (todoId, userId) => {
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
        state.isLoading = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.todoId ? { ...todo, ...action.payload.todoData } : todo
        );
        state.isLoading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.todoId);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getMainTodos.pending,
          getListTodos.pending,
          getFavoriteTodos.pending,
          getPlannedTodos.pending,
          createTodo.pending,
          updateTodo.pending,
          deleteTodo.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export default todosSlice.reducer;
