import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const SignedOutLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to="/signin" style={{ textDecoration: 'none', color: '#fff' }}>Sign In</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/signup" style={{ textDecoration: 'none', color: '#fff' }}>Sign Up</NavLink>
            </li> 
        </ul>
        )
}

export default SignedOutLinks;
