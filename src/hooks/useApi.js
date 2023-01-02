import { useState, useEffect } from 'react';
import * as firebaseApi from '../api/firebaseApi';

export function useApi() {
  const [lists, setLists] = useState([]);
  const [todos, setTodods] = useState([]);

  useEffect(() => {
    firebaseApi.getCollectionDocs('lists').then(setLists);
  }, []);

  async function getListTodos(listId) {
    if (listId) {
      const listTodos = await firebaseApi.getFilteredDocs('todos', 'listId', listId);
      setTodods(listTodos);
    } else {
      setTodods([]);
    }
  }

  async function createTodo(todoData) {
    const todo = await firebaseApi.createDoc('todos', {
      ...todoData,
      completed: false,
    });
    setTodods([...todos, todo]);
  }

  async function updateTodo(todoId, todoData) {
    await firebaseApi.updateDocById('todos', todoId, todoData);
    setTodods(todos.map((todo) => (todo.id === todoId ? { ...todo, ...todoData } : todo)));
  }

  async function deleteTodo(todoId) {
    await firebaseApi.deleteDocById('todos', todoId);
    setTodods(todos.filter((todo) => todo.id !== todoId));
  }

  return {
    data: {
      lists,
      todos,
    },
    actions: {
      getListTodos,
      createTodo,
      updateTodo,
      deleteTodo,
    },
  };
}
