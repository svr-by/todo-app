import { Route, Routes } from 'react-router-dom';
import { TodoList, Layout } from '../components';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div />} />
        <Route path="/:listId" element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default App;
