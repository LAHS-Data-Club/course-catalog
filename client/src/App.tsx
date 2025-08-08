import './App.css';
import { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from './layouts/AppLayout';
import CoursesLayout from './layouts/CoursesLayout';
import PageNotFound from './components/pages/PageNotFound';
import ClubCollection from './components/clubs/ClubCollection';
import ClubPage from './components/clubs/ClubPage';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './components/home/Home';
import UserLayout from './layouts/UserLayout';
import Calendar from './components/calendar/Calendar';
import Courses from './components/courses/CoursesTab';
import CourseCollection from './components/courses/CourseCollection';
import Schedule from './components/user/Schedule';
import Profile from './components/user/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  }
});

// TODO: this persistor is having issues
const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
}); 

// maybe component library but learning experience!!! (kms)
export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <BrowserRouter>
        <ErrorBoundary> 
          <Routes>
            <Route element={<AppLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/user' element={<UserLayout />}>
                <Route index element={<Profile />} />
                <Route path='schedule' element={<Schedule />} />
              </Route>
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/courses' element={<CoursesLayout />}>
                <Route index element={<CourseCollection />} />
                <Route path=':dept' element={<Courses />} />
              </Route>
              <Route path='/clubs'>
                <Route index element={<ClubCollection />} />
                <Route path=':id' element={<ClubPage />} />
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary> 
      </BrowserRouter>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  );
}
