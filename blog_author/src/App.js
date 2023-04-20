import './Styles/style.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardPage from './Pages/DashBoardPage';
import LogInPage from './Pages/LogInPage';
import UserFormPage from './Pages/UserFormPage'
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  
  //Author Dashboard - page showing all author posts and CRUD mananagement of posts
  //User Account Page - for user detail management
  //Post Form Page - create/update posts

  return (
    <Routes>
        <Route path='/blog_author' element={<DashboardPage />} />
        <Route path='/blog_author/log-in' element={<LogInPage />} />
        <Route path='/blog_author/sign-up' element={<UserFormPage action={'create'} />} />
        <Route path='/blog_author/user/:id/update' element={<UserFormPage action={'update'} />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
