import '../styles/PostDetailPage.css'
import React, { useState, useEffect } from 'react';

const CommentForm = ({ setNewCommentFlag, postId, fetchData, setScrollNewComFlag, setScrollComFlag }) => {
    const [errorData, setErrorData] = useState([]);

    
    useEffect(() => {
        //reset scroll to comment section flag to false if new comment form is rendered
        setScrollComFlag(false);
        //scroll to bottom of comment form
        document.getElementById('comment-form').scrollIntoView({ behavior: "smooth", block: "end" });
    // eslint-disable-next-line
    }, []);

    //function to submit new comment to api
    const submitComment = async (e) => {
        e.preventDefault();
        try {
            const comment_text = document.getElementById('input-comment-text').value;
            //request new user from api
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/comment/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment_text }),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                //if successful response, fetch new data, close comment input and call for scroll to new comment
                fetchData();
                setNewCommentFlag(false);
                setScrollNewComFlag(true);
            } else {
                //if not successful response, set error data for rendering
                setErrorData(responseData.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form id='comment-form' action='' method=''>
            <div>
                <label htmlFor='comment-text'>Add new comment: </label>
                <textarea id='input-comment-text' name='comment-text' rows="4" autoFocus required></textarea>
            </div>
            <ul>
                {errorData &&
                    errorData.map((error, i) => {
                        return (
                            <li key={i} className='error-message'>{error.msg}</li>
                        );
                    })
                }
            </ul>
            <button type='submit' className='button-link' onClick={submitComment}>Submit Comment</button>
            <button type='button' className='button-link' onClick={() => setNewCommentFlag(false)}>Cancel</button>
        </form>
    );
};
export default CommentForm;