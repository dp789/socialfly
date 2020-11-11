import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addLike } from '../../store/actions/postAction';
import { removeLike } from '../../store/actions/postAction';

class Likes extends Component {
    handleClick = () => {
        if (this.props.isLiked.length === 0) {
            this.props.addLike(this.props.postId)
        } else if (this.props.isLiked.length !== 0) {
            this.props.removeLike(this.props.isLiked[0].id)
        }
    }
    render() {
        const likedIcon = this.props.isLiked && this.props.isLiked.length !== 0 ? <i className="fas fa-thumbs-up ml-2 like" onClick={this.handleClick}></i> : <i className="far fa-thumbs-up ml-2 like" onClick={this.handleClick}></i>;
        return (
            <div className="wrapper">
                <span>{this.props.postLikes && this.props.postLikes.length}</span>
                {likedIcon}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const userId = state.firebase.auth.uid
    const postId = ownProps.postId;
    const likes = state.firestore.ordered.likes;
    const postLikes = likes ? likes.filter(like => {
        return like.postId === postId
    }) : null;
    const isLiked = postLikes ? postLikes.filter(like => {
        return like.likedById === userId
    }) : null
    return {
        postLikes: postLikes,
        isLiked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addLike: (postId) => dispatch(addLike(postId)),
        removeLike: (likeId) => dispatch(removeLike(likeId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'likes' }
    ])
)(Likes);





