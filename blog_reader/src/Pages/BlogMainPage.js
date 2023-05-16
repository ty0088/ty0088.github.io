import '../styles/BlogMainPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import logOut from '../javascript/logOut';
import PostRow from '../components/PostRow';
import PageNavRow from '../components/PageNavRow';
import PageNavSpan from '../components/PageNavSpan';

const BlogMainPage = ({ setScrollComFlag, setScrollComId }) => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [user, setUser] = useState(null);
    const [pageNum, setPageNum] = useState('');
    const [sortOrd, setSortOrd] = useState('');
    const [limitVal, setLimitVal] = useState('');
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

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {!user &&
                <nav>
                    <Link className='button-link' to='/blog_reader/log-in'>Log In</Link>
                    <Link className='button-link' to='/blog_reader/sign-up'>Sign Up</Link>
                </nav>
            }
            {user &&
                <nav>
                    <Link className='button-link' to={`/blog_reader/user/${user.user_id}`}>My Account ({user.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
            }
            <PageNavRow paginateInfo={paginateInfo} pageNum={pageNum} sortOrd={sortOrd} limitVal={limitVal} />
            {postList.length > 0 &&
                <> 
                    {postList.map((post, i) => {
                        return (
                            <PostRow key={i} user={user} post={post} setScrollComFlag={setScrollComFlag}  />
                        );
                    })}
                    <PageNavSpan paginateInfo={paginateInfo} sortOrd={sortOrd} limitVal={limitVal} classStr={'post-info'}/>
                </>
            }
            {postList.length === 0 &&
                <p>There are no posts to show :(</p>
            }
        </div>
    );
};
export default BlogMainPage;

