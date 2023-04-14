import '../styles/PostDetailPage.css'
import React, { useEffect, useRef } from 'react';

const CommentRow = ({ comment, scrollNewComFlag }) => {
    const ref = useRef();

    useEffect(() => {
        //if scroll is called, scroll to most current comment
        if (ref.current && scrollNewComFlag) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    // eslint-disable-next-line
    }, []);

    return (
        <div className='comment-row' ref={ref}>
            <p>{comment.text}</p>
            <span className='comment-info'>
                {comment.user ? `${comment.user.display_name} [${comment.user.user_type}] ` : '(User not found) '}
                - Posted on: {new Date(comment.post_date).toLocaleString()}
                {comment.lastEditBy &&
                    <span> - <i>Last edited: {new Date(comment.lastEditDate).toLocaleString()} by {comment.lastEditBy.display_name} ({comment.lastEditBy.user_type})</i></span>
                }
            </span>
        </div>
    );
};
export default CommentRow;