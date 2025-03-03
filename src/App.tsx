import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import AppLayout from './layouts/AppLayout';

import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
