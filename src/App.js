import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import PostDetails from './components/posts/PostDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreatePost from './components/posts/CreatePost';
import ProfilesList from './components/profiles/ProfilesList';
import ProfileDetails from './components/profiles/ProfileDetails';
import Home from './components/layout/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Notifications from './components/dashboard/Notifications';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="App">
            <Navbar />
          </div>
          <Switch>
            <Route exact path = "/" component={Home}></Route>
            <Route path="/feed" component={Dashboard}></Route>
            <Route path="/post/:post_id" component={PostDetails}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/create" component={CreatePost}></Route>
            <Route path="/profiles" component={ProfilesList}></Route>
            <Route path="/profile/:profile_id" component={ProfileDetails}></Route>
            <Route path="/notifications" component={Notifications}></Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default App;
