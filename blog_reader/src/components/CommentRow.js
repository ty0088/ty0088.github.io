import '../styles/PostDetailPage.css'
import React, { useEffect, useState, useRef } from 'react';

import ConfirmPopUp from './ConfirmPopUp';

const CommentRow = ({ postId, fetchData, currUser, comment, scrollNewComFlag, setEditCommentId, setNewComFlag }) => {
    const [popUpFlag, setPopUpFlag] = useState(false);
    const ref = useRef();

    useEffect(() => {
        //if scroll is called, scroll to most current comment
        if (ref.current && scrollNewComFlag) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    // eslint-disable-next-line
    }, []);

    const editCommentClick = () => {
        //open edit commment form and close any other forms
        setEditCommentId(comment._id)
        setNewComFlag(false);
    };

    const deleteCommentClick = () => {
        //render confirmation pop up on delete click
        setPopUpFlag(true);
    };

    const confirmDelete = async () => {
        try {
            //request delete comment from api
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/post/${postId}/comment/${comment._id}/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                //if successful response, fetch new data, close pop up
                fetchData();
                setPopUpFlag(false);
            } else {
                //otherwise log response status and text
                console.log(response.status + ' : ' + response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cancelDelete = () => {
        //close confirmation pop up with no other actions
        setPopUpFlag(false);
    };

    return (
        <div className='comment-row' ref={ref} data-commentid={comment._id}>
            <p>{comment.text}</p>
            <div className='comment-info'>
                {comment.user ? <a href={`/blog_reader/user/${comment.user._id}`}>{comment.user.display_name} [{comment.user.user_type}]</a> : '(User not found) '}
                - Posted on: {new Date(comment.post_date).toLocaleString()}
                {comment.lastEditBy &&
                    <span> - <i>Last edited: {new Date(comment.lastEditDate).toLocaleString()} by {comment.lastEditBy.display_name} ({comment.lastEditBy.user_type})</i></span>
                }
                {(currUser.user_type === 'Admin' || (comment.user && (currUser.user_id === comment.user._id))) &&
                    <>
                        &nbsp;- <button type='button' className='button-link' onClick={editCommentClick}>Edit</button>
                        &nbsp;<button type='button' className='button-link' onClick={deleteCommentClick}>Delete</button>
                    </>
                }
                {popUpFlag &&
                    <ConfirmPopUp cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete this comment?'} message2={'This is a permanent action.'} />
                }
            </div>
        </div>
    );
};
export default CommentRow;