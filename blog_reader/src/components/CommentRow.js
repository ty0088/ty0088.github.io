import '../styles/PostDetailPage.css'
import React, { useEffect, useRef } from 'react';

const CommentRow = ({ currUser, comment, scrollNewComFlag, setEditCommentId, setNewComFlag }) => {
    const ref = useRef();

    useEffect(() => {
        //if scroll is called, scroll to most current comment
        if (ref.current && scrollNewComFlag) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    // eslint-disable-next-line
    }, []);

    //open edit commment form and close any other forms
    const editCommentClick = () => {
        setEditCommentId(comment._id)
        setNewComFlag(false);
    };

    //delete clicked comment
    const deleteCommentClick = () => {
        
    };

    return (
        <div className='comment-row' ref={ref}>
            <p>{comment.text}</p>
            <div className='comment-info'>
                {comment.user ? `${comment.user.display_name} [${comment.user.user_type}] ` : '(User not found) '}
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
            </div>
        </div>
    );
};
export default CommentRow;