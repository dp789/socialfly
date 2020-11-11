import React from 'react';
import Comment from './Comment';

const CommentsList = (props) => {
    const { comments } = props;
    const commentsList = comments ? comments.map(comment => {
        return <Comment comment={comment} key={comment.id} />
    }) : null
    return (
        <div className="wrapper">
            {commentsList}
        </div>
    )
}

export default CommentsList;
