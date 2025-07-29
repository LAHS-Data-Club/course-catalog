import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import AppLayout from './layouts/AppLayout';
import CoursesLayout from './layouts/CoursesLayout';

import Home from './components/Home';
import Profile from './components/Profile';
import Courses from './components/courses/Courses';
import AllCourses from './components/courses/AllCourses';

import PageNotFound from './components/PageNotFound';
import ClubsLayout from './layouts/ClubsLayout';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            {/** wasnt sure whether to do this or just children & passing props */}
            <Route path='/courses' element={<CoursesLayout />}>
              <Route index element={<AllCourses />} />
              <Route path=':dept' element={<Courses />} />
            </Route>
            <Route path='/clubs' element={<ClubsLayout />}/>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
