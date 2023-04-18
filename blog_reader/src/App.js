import './styles/style.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//import react pages and components
import BlogMainPage from './Pages/BlogMainPage';
import LogInPage from './Pages/LogInPage';
import PostDetailPage from './Pages/PostDetailPage';
import PostFormPage from './Pages/PostFormPage';
import UserFormPage from './Pages/UserFormPage';
import UserDetailPage from './Pages/UserDetailPage';
import NotFoundPage from './Pages/NotFoundPage';
import RequestLogInPage from './Pages/RequestLogInPage';

function App() {
  const [scrollComFlag, setScrollComFlag] = useState(false);
  const [scrollComId, setScrollComId] = useState(null);

  return (
    <Routes>
      <Route path='/blog_reader' element={<BlogMainPage setScrollComFlag={setScrollComFlag} setScrollComId={setScrollComId} />} />
      <Route path='/blog_reader/create-post' element={<PostFormPage action={'create'} />} />
      <Route path='/blog_reader/update-post' element={<PostFormPage action={'update'} />} />
      <Route path='/blog_reader/post/:postId' element={<PostDetailPage scrollComFlag={scrollComFlag} setScrollComFlag={setScrollComFlag} scrollComId={scrollComId} />} />
      <Route path='/blog_reader/log-in' element={<LogInPage />}/>
      <Route path='/blog_reader/sign-up' element={<UserFormPage action={'create'} />} />
      <Route path='/blog_reader/user/:userId/update' element={<UserFormPage action={'update'} />} />
      <Route path='/blog_reader/user/:userId' element={<UserDetailPage setScrollComId={setScrollComId} />} />
      <Route path='/blog_reader/request-log-in' element={<RequestLogInPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
