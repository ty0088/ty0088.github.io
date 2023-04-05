import '../styles/BlogMainPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fetchUser from '../javascript/fetchUser';
import logOut from '../javascript/logOut';

const BlogMainPage = () => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [user, setUser] = useState(null);

    //on initial render, check if user is logged in, then get blog post list from api
    useEffect(() => {
        //get user credentials if any and get blog list
        const fetchAuthBlogList = async () => {
            try {
                //request user
                const userData = await fetchUser();
                setUser(userData.user);
                //request blog list and include our credentials (cookie)
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post`, { credentials: "include" });
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
        fetchAuthBlogList();
    }, []);

    return (
        <div>
            <h1>The Blog Spot</h1>
            <nav>
                {!user &&
                    <Link to='/blog_reader/log-in'>Log In</Link>
                }
                {user &&
                    <button type='button' onClick={logOut}>Log Out</button>
                }
            </nav>
            <div>
                {postList.length > 0 &&
                    postList.map((post, i) => {
                        return (
                            <div key={i} className='post-row'>
                                {!user &&
                                    <h3>{post.title}</h3>
                                }
                                {user &&
                                    <h3><Link to={`/blog_reader/post/${post._id}`}>{post.title}</Link></h3>
                                }
                                <div className='post-info'>
                                    {user &&
                                        <span>
                                            <a href={`/blog_reader/user/${post.user._id}`}>{post.user.display_name}</a>,&nbsp;
                                        </span>
                                    }
                                        Posted on: {new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                </div>
                                <div className='post-text'>
                                    {post.text}
                                </div>
                                {user &&
                                    <div className='post-footer'>
                                        <span>
                                            <a href={`/blog_reader/post/${post._id}`}>Comments</a> ({post.commentCount})
                                        </span>
                                        {typeof post.lastEditBy == 'object' &&
                                            <span>&nbsp;- Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</span>
                                        }
                                    </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
export default BlogMainPage;

