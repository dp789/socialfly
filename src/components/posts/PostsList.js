import React from 'react';
import PostSummary from './PostSummary';

const PostsList = ({ posts }) => {
    const postsList = posts ? posts.map(post => {
        return (
            <PostSummary post={post} key={post.id} />
        )
    }) : null;
    return (
        <div className="wrapper">
            {postsList}
        </div>
    )
}

export default PostsList;
