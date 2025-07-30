import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import AppLayout from './layouts/AppLayout';
import CoursesLayout from './layouts/CoursesLayout';

import Home from './components/Home';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import Courses from './components/courses/Courses';
import AllCourses from './components/courses/AllCourses';

import PageNotFound from './components/PageNotFound';

// TODO: starting from scratch...
import ClubCollection from './clubs/components/ClubCollection';
import ClubPage from './clubs/components/ClubPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/calendar' element={<Calendar />} />
            {/** wasnt sure whether to do this or just children & passing props */}
            <Route path='/courses' element={<CoursesLayout />}>
              <Route index element={<AllCourses />} />
              <Route path=':dept' element={<Courses />} />
            </Route>

            <Route path='/clubs'>
              <Route index element={<ClubCollection />} />
              <Route path=':id' element={<ClubPage />} />
            </Route>

          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
