import * as firebaseApi from '../firebase/api';

export async function signUp(email, password) {
  return firebaseApi.signUpFirebase(email, password);
}

export async function signIn(email, password) {
  return firebaseApi.signInFirebase(email, password);
}

export async function signOut() {
  return firebaseApi.signOutFirebase();
}

export async function onAuth(dispatch) {
  return firebaseApi.onAuthFirebase((user) => {
    if (user) {
      dispatch({ type: 'SIGNIN_USER', payload: { user } });
      return user;
    } else {
      dispatch({ type: 'SIGNOUT_USER' });
    }
  });
}

export async function getLists(dispatch) {
  const lists = await firebaseApi.getCollectionDocs('lists');
  dispatch({ type: 'GET_LISTS', payload: { lists } });
}

export async function createList(dispatch, listData) {
  const list = await firebaseApi.createDoc('lists', { ...listData });
  dispatch({ type: 'CREATE_LIST', payload: { list } });
}

export async function deleteList(dispatch, listId) {
  let listTodos = await firebaseApi.getEqualToDocs('todos', 'listId', listId);
  for (let todo of listTodos) {
    firebaseApi.deleteDocById('todos', todo.id);
  }
  await firebaseApi.deleteDocById('lists', listId);
  dispatch({ type: 'DELETE_LIST', payload: { listId } });
}

export async function getMainTodos(dispatch) {
  const todos = await firebaseApi.getEqualToDocs('todos', 'listId', '');
  dispatch({ type: 'GET_TODOS', payload: { todos } });
}

export async function getListTodos(dispatch, listId) {
  let todos = listId ? await firebaseApi.getEqualToDocs('todos', 'listId', listId) : [];
  dispatch({ type: 'GET_TODOS', payload: { todos } });
}

export async function getFavoriteTodos(dispatch) {
  const todos = await firebaseApi.getEqualToDocs('todos', 'favorite', true);
  dispatch({ type: 'GET_TODOS', payload: { todos } });
}

export async function getPlannedTodos(dispatch) {
  const todos = await firebaseApi.getNotEqualDocs('todos', 'dueDate', false);
  dispatch({ type: 'GET_TODOS', payload: { todos } });
}

export async function createTodo(dispatch, todoData) {
  const todo = await firebaseApi.createDoc('todos', { ...todoData });
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
