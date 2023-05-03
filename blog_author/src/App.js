import './Styles/style.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import fetchUserToken from './Javascript/fetchUserToken';
import redirectReader from './Javascript/redirectReader';
import DashboardPage from './Pages/DashBoardPage';
import LogInPage from './Pages/LogInPage';
import UserFormPage from './Pages/UserFormPage'
import NotFoundPage from './Pages/NotFoundPage';
import UserDetailPage from './Pages/UserDetailPage';
import PostFormPage from './Pages/PostFormPage';
import PostDetailPage from './Pages/PostDetailPage';

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [scrollComFlag, setScrollComFlag] = useState(false);
  const [scrollComId, setScrollComId] = useState(null);
  let location = useLocation();
  const navigate = useNavigate();

  //----------------------------------------------------------------------------------------
  //author to be able to delete comments on their own posts ------------- to do
  //narrow screen formatting ------------------- to do
  //----------------------------------------------------------------------------------------

  useEffect(() => {
    //on each location change check user type and set user state
    const checkUser = async () => {
      try {
        //get user token
        const userData = await fetchUserToken();
        if (userData.user !== null) {
          //if user token valid then check if user is a reader
          redirectReader(userData.user);
          //if author/admin, set user state
          setCurrUser(userData.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [location]);

  //check if user is logged in, if not redirect to log in page
  useEffect(() => {
    if (!currUser) {
        navigate('/blog_author/log-in');
    }
  // eslint-disable-next-line
  }, [currUser]);

  return (
    <Routes>
        <Route path='/blog_author' element={<DashboardPage currUser={currUser} setScrollComFlag={setScrollComFlag} setScrollComId={setScrollComId} />} />
        <Route path='/blog_author/log-in' element={<LogInPage />} />
        <Route path='/blog_author/sign-up' element={<UserFormPage action={'create'} currUser={currUser} />} />
        <Route path='/blog_author/user/update' element={<UserFormPage action={'update'} currUser={currUser} />} />
        <Route path='/blog_author/user/:userId' element={<UserDetailPage currUser={currUser} setScrollComId={setScrollComId} />} />
        <Route path='/blog_author/post/create' element={<PostFormPage action={'create'} currUser={currUser} />} />
        <Route path='/blog_author/post/:postId' element={<PostDetailPage currUser={currUser} scrollComFlag={scrollComFlag} setScrollComFlag={setScrollComFlag} scrollComId={scrollComId} />} />
        <Route path='/blog_author/post/:postId/update' element={<PostFormPage action={'update'} currUser={currUser} />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
