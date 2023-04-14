import '../styles/PostDetailPage.css'
import React from 'react';

import CommentRow from './CommentRow';

const CommentList = ({ commentData, scrollNewComFlag }) => {

    return (
        <div>
            {commentData.length > 0 &&
                commentData.map((comment, i) => {
                    return (
                        <CommentRow key={i} comment={comment} scrollNewComFlag={scrollNewComFlag} />
                    );
                })
            }
            {commentData.length === 0 &&
                <p>There are currently no comments.</p>
            }
        </div>

    );
};
export default CommentList;