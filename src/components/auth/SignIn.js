import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/feed' />
        return (
            <div className="container">
                <h2 className="titles">Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    { authError ? <div className="alert alert-danger" role="alert">{authError}</div> : null}
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
