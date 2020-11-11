import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    const { auth } = props;
    if (auth.uid) return <Redirect to='/feed' />
    return (
        <div className="container home position-absolute">
            <h5>Connect,Make Friends<br />
            share your ideas<br/>
            And Fly! ⚡</h5>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Home);
