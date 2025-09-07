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

import { ProtectedRoute } from './functions/auth/ProtectedRoute';
import Home from './components/home/Home';
import UserLayout from './layouts/UserLayout';
import ScheduleLayout from './layouts/ScheduleLayout';
import Calendar from './components/calendar/Calendar';
import Courses from './components/courses/CoursesTab';
import CourseCollection from './components/courses/CourseCollection';
import ScheduleInput from './components/user/ScheduleInput';
import Profile from './components/user/Profile';
import AcceptInvitePage from './components/schedules/AcceptInvitePage';
import ScheduleGroup from './components/schedules/ScheduleGroup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    }
  }
});

const asyncStoragePersister = createAsyncStoragePersister({
  // storage: window.localStorage,
  storage: null,
}); 

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
              {/** Public routes */}
              <Route path='/' element={<Home />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/courses' element={<CoursesLayout />}>
                <Route index element={<CourseCollection />} />
                <Route path=':dept' element={<Courses />} />
              </Route>
              <Route path='/clubs'>
                <Route index element={<ClubCollection />} />
                <Route path=':id' element={<ClubPage />} />
              </Route>
              {/** Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path='/user' element={<UserLayout />}>
                  <Route index element={<Profile />} />
                  <Route path='schedule' element={<ScheduleInput />} />
                </Route>
                <Route path='/schedule-sharing' element={<ScheduleLayout />}>
                  <Route path=':id' element={<ScheduleGroup />} />
                </Route>
              </Route>
            </Route>
            <Route path='/schedule-sharing/invite/:id' element={<AcceptInvitePage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary> 
      </BrowserRouter>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  );
}
