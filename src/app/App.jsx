import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeUserData } from 'redux/slices/userSlice';
import { onAuthFirebase } from 'api/api';
import { SignInPage, SignUpPage, MainPage, LandingPage, NotFoundPage } from 'pages';
import { MainList } from 'pages/mainPage/components/MainList';
import { FavoriteList } from 'pages/mainPage/components/FavoriteList';
import { PlannedList } from 'pages/mainPage/components/PlannedList';
import * as ROUTES from 'core/routes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthFirebase((user) => {
      dispatch(storeUserData(user ? user : null));
    });
  }, [dispatch]);

  return (
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
  );
}

export default App;
