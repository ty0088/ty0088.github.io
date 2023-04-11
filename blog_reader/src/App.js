import './styles/style.css'
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//import react pages and components
import BlogMainPage from './Pages/BlogMainPage';
import LogInPage from './Pages/LogInPage';
import PostDetailPage from './Pages/PostDetailPage';
import PostFormPage from './Pages/PostFormPage';
import UserFormPage from './Pages/UserFormPage';
import UserDetailPage from './Pages/UserDetailPage';

function App() {
  return (
    <Routes>
      <Route path='/blog_reader' element={<BlogMainPage />} />
      <Route path='/blog_reader/create-post' element={<PostFormPage action={'create'} />} />
      <Route path='/blog_reader/update-post' element={<PostFormPage action={'update'} />} />
      <Route path='/blog_reader/post/:postId' element={<PostDetailPage />} />
      <Route path='/blog_reader/log-in' element={<LogInPage />}/>
      <Route path='/blog_reader/sign-up' element={<UserFormPage action={'create'} />} />
      <Route path='/blog_reader/user/:userId/update' element={<UserFormPage action={'update'} />} />
      <Route path='/blog_reader/user/:userId' element={<UserDetailPage />} />
    </Routes>
  );
}

export default App;
