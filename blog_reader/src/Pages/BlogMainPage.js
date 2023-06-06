import '../Styles/BlogMainPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import fetchUserToken from '../Javascript/fetchUserToken';
import logOut from '../Javascript/logOut';
import PostRow from '../Components/PostRow';
import PageNavRow from '../Components/PageNavRow';
import PageNavSpan from '../Components/PageNavSpan';
import ConfirmPopUp from '../Components/ConfirmPopUp';

const BlogMainPage = ({ setScrollComFlag, setScrollComId }) => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [user, setUser] = useState(null);
    const [pageNum, setPageNum] = useState('');
    const [sortOrd, setSortOrd] = useState('');
    const [limitVal, setLimitVal] = useState('');
    const [popUpFlag, setPopUpFlag] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        //get query string values if any
        const getQueryVals = () => {
            setPageNum(searchParams.get('page') || '');
            setSortOrd(searchParams.get('sortOrd') || '');
            setLimitVal(searchParams.get('limit') || '');
        };
        getQueryVals();
    });

    //on initial render, get query string values, check if user is logged in, then get blog post list from api
    useEffect(() => {
        //set scroll to comment states to false (reset to default behavior)
        setScrollComFlag(false);
        setScrollComId(null);

        //get user token (if any) and get blog list
        const fetchData = async () => {
            try {
                //fetch user token data from api
                const userData = await fetchUserToken();
                setUser(userData.user);
                //request blog list from api
                const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/post?page=${pageNum}&sortOrd=${sortOrd}&limit=${limitVal}` : `${process.env.REACT_APP_BLOGAPI_URL}/post?page=${pageNum}&sortOrd=${sortOrd}&limit=${limitVal}`, { credentials: "include" });
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
            }
        };
        fetchData();
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line
    }, [pageNum, sortOrd, limitVal]);

    //prompt confirm pop up for demo log in
    const demoLogInClick = () => {
        setPopUpFlag(true);
    };

    //log into demo account
    const confirmDemoLogin = async () => {
        try {
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/log-in` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-in`, {    
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'demo@demo', password: ' ' }),
            });
            if (response.status === 200) {
                //if successful response, refresh page
                window.location.reload();
            } else {
                //if not successful response, set error data for rendering
                const responseData = await response.json();
                console.log(responseData.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //cancel demo log in and remove pop up
    const cancelDemoLogin = () => {
        setPopUpFlag(false);
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {!user &&
                <nav>
                    <Link className='button-link' to='/blog_reader/log-in'>Log In</Link>
                    <Link className='button-link' to='/blog_reader/sign-up'>Sign Up</Link>
                    <button type='button' className='button-link' onClick={demoLogInClick}>Demo Log In</button>
                </nav>
            }
            {user &&
                <nav>
                    <Link className='button-link' to={`/blog_reader/user/${user.user_id}`}>My Account ({user.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
            }
            <PageNavRow paginateInfo={paginateInfo} pageNum={pageNum} sortOrd={sortOrd} limitVal={limitVal} />
            {(user && user.user_type === 'Demo') &&
                <span className='post-info'>*This is a read only Demo Account - No submitted data will be saved.*</span>
            }
            {postList.length > 0 &&
                <> 
                    {postList.map((post, i) => {
                        return (
                            <PostRow key={i} user={user} post={post} setScrollComFlag={setScrollComFlag}  />
                        );
                    })}
                    <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal}/>
                </>
            }
            {postList.length === 0 &&
                <p>There are no posts to show :(</p>
            }
            {popUpFlag &&
                <ConfirmPopUp name={'Demo Account'} cancelClick={cancelDemoLogin} confirmClick={confirmDemoLogin} message1={'You are logging into a'} message2={'You will be able to access all user areas and functions, however no data will be saved. If you wish to save any data, please create an account.'} />
            }
            </div>
    );
};
export default BlogMainPage;