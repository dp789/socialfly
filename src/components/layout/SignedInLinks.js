import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const SignedInLinks= (props) => {
    const { profile, userId } = props;
    return (
        <ul className="navbar-nav">
            <li className="nav-item-ml-2">
            <NavLink to={'/profile/' + userId} style={{ textDecoration: 'none', color: '#fff' }}>
                <div className="d-flex justify-content-start">
                    <div className="img-holder">
                        <img src={profile.avatar} />
                    </div>
                    <p className="ml-2">{profile.firstName} {profile.lastName}</p>
                </div>
            </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/create" style={{ textDecoration: 'none', color: '#fff' }}>Create Post</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/profiles" style={{ textDecoration: 'none', color: '#fff' }}>Profiles</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/notifications" style={{ textDecoration: 'none', color: '#fff' }}>Notifications</NavLink>
            </li>
            <li className="nav-item" style={{ color: '#fff', cursor: 'pointer' }}>
                <a onClick={ props.signOut }>Log Out</a>
            </li>
        </ul> 
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
