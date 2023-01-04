import { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoList, Layout } from '../components';
import { StateContext, initialState, reducer, actions } from '../store';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch, actions }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div />} />
          <Route path="/:listId" element={<TodoList />} />
        </Route>
      </Routes>
    </StateContext.Provider>
  );
}

export default App;
