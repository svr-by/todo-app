import { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoList } from '../components';
import { SignInPage, MainPage } from '../pages';
import { StateContext, initialState, reducer, actions } from '../store';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch, actions }}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<div />} />
          <Route path="/:listId" element={<TodoList />} />
        </Route>
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </StateContext.Provider>
  );
}

export default App;
