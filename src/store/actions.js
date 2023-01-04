import * as firebaseApi from '../api/firebaseApi';

export function setLoading(dispatch, status) {
  dispatch({ type: 'SET_LOADING', payload: { status } });
}

export async function getLists(dispatch) {
  const lists = await firebaseApi.getCollectionDocs('lists');
  dispatch({ type: 'GET_LISTS', payload: { lists } });
}

export async function getListTodos(dispatch, listId) {
  let todos = [];
  if (listId) {
    todos = await firebaseApi.getFilteredDocs('todos', 'listId', listId);
  }
  dispatch({ type: 'GET_TODOS', payload: { todos } });
}

export async function createTodo(dispatch, todoData) {
  const todo = await firebaseApi.createDoc('todos', {
    ...todoData,
    completed: false,
  });
  dispatch({ type: 'CREATE_TODO', payload: { todo } });
}

export async function updateTodo(dispatch, todoId, todoData) {
  await firebaseApi.updateDocById('todos', todoId, todoData);
  dispatch({ type: 'UPDATE_TODO', payload: { todoId, todoData } });
}

export async function deleteTodo(dispatch, todoId) {
  await firebaseApi.deleteDocById('todos', todoId);
  dispatch({ type: 'DELETE_TODO', payload: { todoId } });
}
