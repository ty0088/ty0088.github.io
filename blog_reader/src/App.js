import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//import react pages and components
import BlogMainPage from './Pages/BlogMainPage';
import LogInPage from './Pages/LogInPage';
import PostDetailPage from './Pages/PostDetailPage';
import PostFormPage from './Pages/PostFormPage';
import SignUpPage from './Pages/SignUpPage';
import UserDetailPage from './Pages/UserDetailPage';

function App() {
  return (
    <div id='main-container'>
      <Routes>
        <Route path='/blog_reader' element={<BlogMainPage />}/>
        <Route path='/blog_reader/create-post' element={<PostFormPage action={'create'}/>}/>
        <Route path='/blog_reader/update-post' element={<PostFormPage action={'update'}/>}/>
        <Route path='/blog_reader/post' element={<PostDetailPage />}/>
        <Route path='/blog_reader/sign-up' element={<SignUpPage />}/>
        <Route path='/blog_reader/log-in' element={<LogInPage />}/>
        <Route path='/blog_reader/user' element={<UserDetailPage />}/>
      </Routes>
    </div>
  );
}

export default App;
