import '../styles/PostDetailPage.css'
import React from 'react';

import CommentRow from './CommentRow';
import CommentForm from './CommentForm';

const CommentList = ({ currUser, commentData, scrollNewComFlag, postId, fetchData, setNewComFlag, setScrollNewComFlag, setScrollComFlag, editCommentId, setEditCommentId }) => {

    return (
        <div>
            {commentData.length > 0 &&
                commentData.map((comment, i) => {   
                    if (editCommentId === comment._id) {
                        //if comment is set to edit, render comment form
                        console.log(comment.text);
                        return (
                            <CommentForm key={i} postId={postId} commentText={comment.text} fetchData={fetchData} setNewComFlag={setNewComFlag} setScrollNewComFlag={setScrollNewComFlag} setScrollComFlag={setScrollComFlag} editCommentId={editCommentId} setEditCommentId={setEditCommentId} />
                        );
                    } else {
                        //else render a comment row
                        return (
                            <CommentRow key={i} currUser={currUser} comment={comment} scrollNewComFlag={scrollNewComFlag} setEditCommentId={setEditCommentId} setNewComFlag={setNewComFlag} />
                        );
                    }
                })
            }
            {commentData.length === 0 &&
                <p>There are currently no comments.</p>
            }
        </div>

    );
};
export default CommentList;