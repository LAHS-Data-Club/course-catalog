import './App.css';
import { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from './layouts/AppLayout';
import CoursesLayout from './layouts/CoursesLayout';
import PageNotFound from './pages/PageNotFound';
import ClubCollection from './pages/clubs/components/ClubCollection';
import ClubPage from './pages/clubs/components/ClubPage';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/home/Home';
import Profile from './components/Profile';
import Calendar from './pages/calendar/Calendar';
import Courses from './pages/courses/components/CoursesTab';
import CourseCollection from './pages/courses/components/CourseCollection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  }
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
}); 

// maybe component library but learning experience!!!
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
              <Route path='/profile' element={<Profile />} />
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
