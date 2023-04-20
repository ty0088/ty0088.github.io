import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import logOut from '../Javascript/logOut'
import fetchUserToken from '../Javascript/fetchUserToken';
import redirectReader from '../Javascript/redirectReader';
import PostRow from '../Components/PostRow';
import PageNavRow from '../Components/PageNavRow';
import PageNavSpan from '../Components/PageNavSpan';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [pageNum, setPageNum] = useState(null);
    const [sortOrd, setSortOrd] = useState(null);
    const [limitVal, setLimitVal] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    //fetch user token and user's posts
    useEffect(() => {
        //get query string values if any
        const getQueryVals = () => {
            setPageNum(searchParams.get('page') || '');
            setSortOrd(searchParams.get('sortOrd') || '');
            setLimitVal(searchParams.get('limit') || '');   
        };

        const fetchData = async () => {
            try {
                //get user token
                const userData = await fetchUserToken();
                //check token has returned a user
                if (userData.user !== null) {
                    //if user is reader, redirect to reader site
                    redirectReader(userData.user);
                    //if user is not a reader, set user state
                    setUser(userData.user);
                    //request user's post list from api
                    const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/${userData.user.user_id}/post-list${window.location.search}`, { credentials: "include" });
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
                } else {
                    //if no user token, redirect to log in page
                    navigate('/blog_author/log-in');
                }
            } catch (error) {
                console.log(error);
            }
        };

        getQueryVals();
        fetchData();

    // eslint-disable-next-line
    }, []);

    if (user) {
        return (
            <div id='main-container'>
                <h1>The Blog Spot - Author Dashboard</h1>
                <nav>
                    <Link className='button-link' to={`/blog_reader/user/${user.user_id}`}>My Account ({user.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
                <PageNavRow paginateInfo={paginateInfo} pageNum={pageNum} sortOrd={sortOrd} limitVal={limitVal} />
                {postList.length > 0 &&
                    <> 
                        {postList.map((post, i) => {
                            return (
                                <PostRow key={i} post={post} />
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
    }
};
export default DashboardPage;