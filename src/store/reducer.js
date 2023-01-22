export default function reducer(state, action) {
  switch (action.type) {
    case 'SIGNIN_USER':
      return { ...state, user: action.payload.user, isLoading: false };
    case 'SIGNOUT_USER':
      return { ...state, user: null, isLoading: false };
    case 'GET_LISTS':
      return { ...state, lists: [...action.payload.lists] };
    case 'CREATE_LIST':
      return { ...state, lists: [...state.lists, action.payload.list] };
    case 'DELETE_LIST':
      return { ...state, lists: state.lists.filter((list) => list.id !== action.payload.listId) };
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
