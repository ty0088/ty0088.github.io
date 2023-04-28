import '../styles/PostDetailPage.css'
import React, { useState, useEffect } from 'react';

const CommentForm = ({ postId, commentText, fetchData, setNewComFlag, setScrollNewComFlag, setScrollComFlag, editCommentId, setEditCommentId }) => {
    const [errorData, setErrorData] = useState([]);

    useEffect(() => {
        //reset scroll to comment section flag to false if new comment form is rendered
        setScrollComFlag(false);
        //scroll to bottom of comment form
        document.getElementById('comment-form').scrollIntoView({ behavior: "smooth", block: "end" });
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        //focus on input and end of string if any
        if (commentText) {
            document.getElementById('input-comment-text').setSelectionRange(commentText.length, commentText.length);
        }
        document.getElementById('input-comment-text').focus();
    }, [commentText]);

    //function to submit new or edited comment to api
    const submitComment = async (e) => {
        e.preventDefault();
        try {
            const comment_text = document.getElementById('input-comment-text').value;
            let response = null;
            //check whether new comment or update comment
            if (!editCommentId) {
                //request new comment from api
                response = await fetch(process.env.NODE_ENV === 'production' ? `https://blogapi.ty0088.repl.co/post/${postId}/comment/create` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/comment/create`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ comment_text }),
                });
            } else {
                //request update comment from api
                    response = await fetch(process.env.NODE_ENV === 'production' ? `https://blogapi.ty0088.repl.co/post/${postId}/comment/update` : `${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/comment/update`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ comment_text }),
                });
            }
            const responseData = await response.json();
            if (response.status === 200) {
                //if successful response, fetch new data, close comment input and call for scroll to new comment
                fetchData();
                setNewComFlag(false);
                setEditCommentId(null);
                setScrollNewComFlag(true);
            } else {
                //if not successful response, set error data for rendering
                setErrorData(responseData.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //cancel edit comment form
    const cancelClick = () => {
        setNewComFlag(false);
        setEditCommentId(null);
    };

    return (
        <form id='comment-form' action='' method=''>
            <div>
                <label htmlFor='comment-text'>{editCommentId ? 'Edit Comment' : 'Add new comment: '}</label>
                <textarea id='input-comment-text' name='comment-text' rows="4" defaultValue={commentText} required></textarea>
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
            <div className='button-container'>
                <button type='submit' className='button-link' onClick={submitComment}>Submit Comment</button>
                <button type='button' className='button-link' onClick={cancelClick}>Cancel</button>
            </div>
        </form>
    );
};
export default CommentForm;