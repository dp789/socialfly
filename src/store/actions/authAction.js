export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', credentials})
        }).catch((err) => {
            dispatch({ type: 'LOGIN_FAILED', err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                avatar: newUser.avatar,
                role: newUser.role,
                techStack: newUser.techStack,
                portfolio: newUser.portfolio,
                linkedin: newUser.linkedin,
                twitter: newUser.twitter,
                github: newUser.github,
                instagram: newUser.instagram,
                email: newUser.email,
                password: newUser.password,
                aboutMe: newUser.aboutMe
            })
        }).then(() => {
            dispatch({ type:'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type:'SIGNUP_FAILED', err})
        })
    }
}