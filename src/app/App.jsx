import { useReducer, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoList } from '../components';
import { SignInPage, SignUpPage, MainPage } from '../pages';
import { StateContext, initialState, reducer, actions } from '../store';
import * as ROUTES from '../constants/routes';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    actions.onAuth(dispatch);
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch, actions }}>
      <Routes>
        <Route path={ROUTES.LANDING} element={<MainPage />}>
          <Route path={ROUTES.LIST_ID} element={<TodoList />} />
        </Route>
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      </Routes>
    </StateContext.Provider>
  );
}

export default App;
