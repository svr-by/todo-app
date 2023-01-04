export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload.status };
    case 'GET_LISTS':
      return { ...state, lists: [...action.payload.lists] };
    case 'GET_TODOS':
      return { ...state, todos: [...action.payload.todos] };
    case 'CREATE_TODO':
      return { ...state, todos: [...state.todos, action.payload.todo] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId ? { ...todo, ...action.payload.todoData } : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload.todoId) };
    default:
      return state;
  }
}
