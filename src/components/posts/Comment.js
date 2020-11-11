import React from 'react';
import moment from 'moment';

const Comment = (props) => {
    const { comment } = props;
    return (
        <div className="wrapper my-5 w-95">
            <div className="d-flex justify-content-start align-items-center my-1">
                <div className="img-holder">
                    <img src={comment.commenterAvatar} />
                </div>
                <h6 className="card-subtitle ml-2 text-muted">{comment.commenterFirstName} {comment.commenterLastName}</h6>
            </div>
            <p>{comment.comment}</p>
            <p><small>{moment(comment.createdAt.toDate().toString()).fromNow()}</small></p>
        </div>
    )
}

export default Comment;