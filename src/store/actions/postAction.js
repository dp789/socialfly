export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('posts').add(
            {
                ...project,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorAvatar: profile.avatar,
                authorId,
                createdAt: new Date()
            }
        ).then(() => {
            dispatch({ type:'CREATE_POST', project })
        }).catch((err) => {
            dispatch({ type:'CREATE_POST_FAILED', err })
        }) 
    }
}

export const addComment = (comment) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const commenterId = getState().firebase.auth.uid;
        const userComment = {
            ...comment,
            commenterFirstName: profile.firstName,
            commenterLastName: profile.lastName,
            commenterAvatar: profile.avatar,
            commenterId,
            createdAt: new Date()
        }
        firestore.collection('comments').add({
            ...userComment
        }).then(() => {
            dispatch({ type: 'COMMENT_ADDED', comment })
        }).catch((err) => {
            dispatch({ type: 'COMMENT_FAILED', err })
        })
    }
}

export const addLike = (postId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const likedById = getState().firebase.auth.uid;
        const like = {
            postId,
            likedById
        }
        firestore.collection('likes').add({
            ...like
        }).then(() => {
            dispatch({ type: 'LIKED_POST', like})
        })
    }
}

export const removeLike = (likeId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('likes').doc(likeId).delete()
        .then(() => {
            dispatch({ type: 'UNLIKED_POST' })
        }).catch((err) => {
            dispatch({ type: 'UNLIKE_POST_FAILED', err})
        })
    }
}