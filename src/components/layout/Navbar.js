import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Navbar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} userId={auth.uid} /> : <SignedOutLinks />
    return (
        <nav className="navbar navbar-dark">
            { auth.uid ? <NavLink to="/feed"><span className="navbar-brand-mb-0-h1">Social Fly</span></NavLink> : <NavLink to="/"><span className="navbar-brand-mb-0-h1">Social Fly</span></NavLink> }
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMenu">
                { links }
            </div>
        </nav>
        )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);
