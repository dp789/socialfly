import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ProfileSummary from './ProfileSummary';

class ProfilesList extends Component {
    render() {
        const { auth, users } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        const otherUsers = users ? users.filter(user => {
            return user.id !== auth.uid
        }) : null;
        const usersList = otherUsers ? otherUsers.map((user) => {
            return <ProfileSummary key={user.id} user={user} />
        }) : null;
        return (
            <div className="container py-2">
                <h2 className="titles">Profiles</h2>
                { usersList }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(ProfilesList);
