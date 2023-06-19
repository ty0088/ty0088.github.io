import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import decodeHtml from '../Javascript/decodeHtml';
import getS3ImageUrl from '../Javascript/getS3ImageUrl';

const PostRow = ({ post, postPrivacyClick, deletePostClick, setScrollComFlag }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //get and set s3 image url to state. State will be set to null if no image available
        const setS3Url = async (postId) => {
            try {
                const s3Url = await getS3ImageUrl(postId);
                setImageUrl(s3Url);
            } catch (error) {
                console.log(error);
            }
        };
        setS3Url(post._id);
    }, [post]);

    //go to post detail page and scroll to comment
    const commentClick = () => {
        setScrollComFlag(true);
        navigate(`/blog_author/post/${post._id}`);
    };

    return (
        <div className='post-row'>
            <h3><Link to={`/blog_author/post/${post._id}`}>{decodeHtml(post.title)}</Link></h3>
            <div className='post-info'>{new Date(post.post_date).toLocaleString('en-GB', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
            <hr></hr>
            {imageUrl &&
                <img src={imageUrl} alt={`${post._id} img`} className='post-image'/>
            }
            <div className='post-text'>{parse(post.text)}</div>
            <hr></hr>
            <div className='post-footer'>
                {post.private &&
                    <div>
                        <span>Post is <strong>Private</strong></span>&nbsp;-&nbsp;
                        <button type='button' className='btn-link' onClick={() => postPrivacyClick(post._id)}>Make Public</button>
                    </div>
                }
                {!post.private &&
                    <div>
                        <span>Post is <strong>Public</strong></span>&nbsp;-&nbsp;
                        <button type='button' className='btn-link' onClick={() => postPrivacyClick(post._id)}>Make Private</button>
                    </div>
                }
                <div>
                    <button type='button' className='btn-link' onClick={() => navigate(`/blog_author/post/${post._id}/update`)}>Edit</button>
                    <button type='button' className='btn-link' onClick={() => deletePostClick(post._id)}>Delete</button>
                    <button type='button' className='btn-link'  onClick={commentClick}>Comments ({post.commentCount})</button>
                </div>
                {typeof post.lastEditBy == 'object' &&
                    <span><i>Last edited: {new Date(post.lastEditDate).toLocaleString()} by {post.lastEditBy.display_name} ({post.lastEditBy.user_type})</i></span>
                }
            </div>
        </div>
    );
};
export default PostRow;