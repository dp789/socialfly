import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { storage } from '../../config/fbConfig';
import { signUp } from '../../store/actions/authAction';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        avatar: 'https://www.digitalwebreview.com/wp-content/uploads/2018/09/default-user-image-300x300.png',
        role: '',
        techStack: '',
        portfolio: '',
        linkedin: '',
        twitter: '',
        github: '',
        instagram: '',
        email: '',
        password: '',
        aboutMe: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    handleImageChange = (e) => {
        const image = e.target.files[0]

        const uploadTask = storage.ref(`image/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                .ref('image')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({
                        avatar: url
                    })
                    console.log('success')
                })
            }
        )
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/feed' />
        return (
            <div className="container">
                <h2 className="titles">Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <h5 className="titles">User Info</h5>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="firstName" placeholder="First Name" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" required onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleChange} />
                            <small className="form-text titles">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group col-sm-6">
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="file" className="form-control-file browse-files" id="exampleFormControlFile1" accept="image/x-png,image/jpeg" onChange={this.handleImageChange} />
                        <small className="form-text titles">Choose an image for your profile.</small>
                    </div>
                    <h5 className="titles">Skills</h5>
                    <div className="form-row">
                        <div className="form-group col-sm-7">
                            <input type="text" className="form-control" id="role" placeholder="Role" required onChange={this.handleChange} />
                            <small className="form-text titles">What do you do? Ex. Front-End Developer, Game Developer, Designer etc.</small>
                        </div>
                        <div className="form-group col-sm-5">
                            <input type="text" className="form-control" id="techStack" placeholder="Tech Stack" required onChange={this.handleChange} />
                            <small className="form-text titles">Let us know what languages/tools you use for your work.</small>
                        </div>
                    </div>
                    <h5 className="titles">Social Handles</h5>
                    <div className="form-group">
                            <input type="text" className="form-control" id="portfolio" placeholder="Portfolio Site" onChange={this.handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="linkedin" placeholder="LinkedIn URL" onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="twitter" placeholder="Twitter URL" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="github" placeholder="GitHub URL" onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-sm-6">
                            <input type="text" className="form-control" id="instagram" placeholder="Instagram URL" onChange={this.handleChange} />
                        </div>
                    </div>
                    <h5 className="titles">About You</h5>
                    <div className="form-group">
                        <textarea className="form-control" id="aboutMe" rows="5" placeholder="Share something about yourself so that people can connect better with you!" required onChange={this.handleChange}></textarea>
                    </div>
                    { authError ? <div className="alert alert-danger" role="alert">{authError}</div> : null}
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    <div className="center-text titles">
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

