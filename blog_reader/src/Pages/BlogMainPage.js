import React, { useState, useEffect } from 'react';

const BlogMainPage = () => {
    const [postList, setPostList] = useState([]);
    const [paginateInfo, setPaginateInfo] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                //on initial render, fetch blog post list from blog api
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_ORIGIN}/post`);
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
                setError(error);
            }
        };
        fetchResponse();
    }, []);

    return (
        <div>
            {postList.length > 0 &&
                postList.map((post, i) => {
                    return (
                        <div key={i}>
                            <h3>{post.title}</h3>
                            <p>{post.text}</p>
                        </div>
                    );
                })
            }
            
        </div>
    );
};
export default BlogMainPage;

