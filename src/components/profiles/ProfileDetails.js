import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PostSummary from '../posts/PostSummary';

const ProfileDetails = (props) => {
    const { auth, user, userPosts } = props;
    if (!auth.uid) return <Redirect to='/' />
    const postsList = userPosts ? userPosts.map(post => {
        return <PostSummary key={post.id} post={post} />
    }) : null;
    if (user) {
        return (
            <div className="container py-2">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-start align-items-center my-1">
                            <div className="profile-img-holder">
                                <img src={user.avatar} />
                            </div>
                            <div className="d-flex flex-column ml-3">
                                <h6>{user.role}</h6>
                                <h6>{user.techStack}</h6>
                            </div>
                        </div>
                        <h4>{user.firstName} {user.lastName}</h4>
                        <hr />
                        <h5>About Me</h5>
                        <p className="card-text">{user.aboutMe}</p>
                        { user.portfolio ? <p className="card-text">Visit me <a target="_blank" href={user.portfolio}>here</a></p> : null }
                        { user.linkedin ? <a className="social-links" target="_blank" href={user.linkedin}><i className="fab fa-linkedin fa-2x mr-2"></i></a> : null }
                        { user.twitter ? <a className="social-links" target="_blank" href={user.twitter}><i className="fab fa-twitter fa-2x mr-2"></i></a> : null }
                        { user.github ? <a className="social-links" target="_blank" href={user.github}><i className="fab fa-github fa-2x mr-2"></i></a> : null }
                        { user.instagram ? <a className="social-links" target="_blank" href={user.instagram}><i className="fab fa-instagram fa-2x mr-2"></i></a> : null }
                    </div>
                </div>
                {userPosts && userPosts.length !== 0 ? <h3 className="mt-5 mb-3 titles">Posts</h3> : null }
                { postsList }
            </div>
        )  
    } else {
        return (
            <div className="container"></div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.profile_id;
    const users = state.firestore.data.users;
    const user = users ? users[id] : null;
    const posts = state.firestore.ordered.posts;
    const userPosts = posts ? posts.filter((post) => {
        return post.authorId === id
    }) : null;
    return {
        auth: state.firebase.auth,
        user: user,
        userPosts: userPosts
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'posts' }
    ])
)(ProfileDetails);
