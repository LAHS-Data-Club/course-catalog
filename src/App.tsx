import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './components/Home';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
