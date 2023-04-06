import '../styles/BlogMainPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import logOut from '../javascript/logOut';
import PostRow from '../components/PostRow';

const BlogMainPage = () => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [user, setUser] = useState(null);

    //on initial render, check if user is logged in, then get blog post list from api
    useEffect(() => {
        //get user token (if any) and get blog list
        const fetchData = async () => {
            try {
                //fetch user token data from api
                const userData = await fetchUserToken();
                setUser(userData.user);
                //request blog list from api
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post${window.location.search}`, { credentials: "include" });
                const responseData = await response.json();
                //once response is returned, set the post list and paginate data to state
                setPostList(responseData.docs);
                setPaginateInfo({
                    totalDocs: responseData.totalDocs,
                    limit: responseData.limit,
                    totalPages: responseData.totalPages,
                    page: responseData.page,
                    pagingCounter: responseData.page,
                    hasPrevPage: responseData.hasPrevPage,
                    hasNextPage: responseData.hasNextPage,
                    prevPage: responseData.prevPage,
                    nextPage: responseData.nextPage,
                });
            } catch (error) {
                console.log(error);
                //set error state to render to page----------- ??
            }
        };
        fetchData();
    }, []);

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {!user &&
                <nav>
                    <Link to='/blog_reader/log-in'>Log In</Link>
                </nav>
            }
            {user &&
                <nav>
                    <Link to={`/blog_reader/user/${user.user_id}`}>My Account ({user.display_name})</Link>
                    <button type='button' onClick={logOut}>Log Out</button>
                </nav>
            }
            {postList.length > 0 &&
                postList.map((post, i) => {
                    return (
                        <PostRow key={i} user={user} post={post}  />
                    );
                })
            }
            {postList.length === 0 &&
                <p>There are no posts to show :(</p>
            }
        </div>
    );
};
export default BlogMainPage;

