import { useReducer, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainList, FavoriteList, PlannedList } from '../components';
import { SignInPage, SignUpPage, MainPage, LandingPage, NotFoundPage } from '../pages';
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
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.MAIN} element={<MainPage />}>
          <Route index element={<MainList />} />
          <Route path={ROUTES.LIST_ID} element={<MainList />} />
        </Route>
        <Route path={ROUTES.FAVORITE} element={<MainPage />}>
          <Route index element={<FavoriteList />} />
        </Route>
        <Route path={ROUTES.PLANNED} element={<MainPage />}>
          <Route index element={<PlannedList />} />
        </Route>
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </StateContext.Provider>
  );
}

export default App;
