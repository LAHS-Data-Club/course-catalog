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
import ScheduleLayout from './layouts/ScheduleLayout';
import Calendar from './components/calendar/Calendar';
import Courses from './components/courses/CoursesTab';
import CourseCollection from './components/courses/CourseCollection';
import ScheduleInput from './components/user/ScheduleInput';
import Profile from './components/user/Profile';
import { ProtectedRoute } from './functions/auth/ProtectedRoute';

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
  // storage: window.localStorage,
  storage: null,
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
                <Route index element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='schedule' element={<ScheduleInput />} />
              </Route>
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/courses' element={<CoursesLayout />}>
                <Route index element={<CourseCollection />} />
                <Route path=':dept' element={<Courses />} />
              </Route>
              <Route path='/schedule-sharing' element={<ProtectedRoute><ScheduleLayout /></ProtectedRoute>} />
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
