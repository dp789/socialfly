import React, { Component } from 'react'
import PostsList from '../posts/PostsList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { posts, auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div className="container py-2">
                <h2 className="titles">Feed</h2>
                <PostsList posts={posts} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);
