import React, { Component } from "react";
import './index.css'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Post from "./components/Header/Post/Post";
import Login from "./components/Header/Login/Login"
import Errors from "./components/Errors";

import Home from "./components/Header/Home/Home";
import PostView from "./components/Header/Post/PostView";
import Profile from "./components/Header/Profile/Profile";
import Admin from "./components/Admin/AdminDashboard/AdminDashboard";
import User from "./components/Admin/User/UserManagement";
import PostManagement from "./components/Admin/Post/PostManagement";

import ScrollToTop from "./components/ScrollToTop";

import UpdatePassword from "./components/Header/Login/UpdatePassword";

import AboutUs from "./components/Header/AboutUs/AboutUs";
import ListPost from "./components/Header/Post/listPost";
import MyPost from "./components/Header/Post/MyPost";
import SearchPeople from "./components/Header/Post/SearchPeople";
import UserView from "./components/Header/Post/UserView";
import Card from "./components/Card";
import ExpandMore from "./components/CardPost"
import ResetPass from "./components/Header/Login/ResetPass";
import NewPass from "./components/Header/Login/NewPass";


function App() {
    return (
      <Router basename='/Appointment_fe/'>
        <ScrollToTop />  
        <Switch>
        
          <Route exact path="/" component={Home} />
          <Route exact path="/card" component={ExpandMore} />
   
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/admindashboard" component={Admin} />
          <Route path="/admindashboard/user" component={User} />
          <Route path="/admindashboard/post" component={PostManagement} />
         
          <Route exact path="/post/allpost" component={ListPost} />
          <Route path="/post/member/memberview" component={UserView} />
          <Route exact path="/post/mypost" component={MyPost} />
          <Route exact path="/post/member" component={SearchPeople} />
          <Route path="/post/view" component={PostView} />
          <Route path="/updatepassword" component={UpdatePassword} />

          <Route path="/login" component={Login} />
          <Route path="/resetpass" component={ResetPass} />
          <Route path="/newpass" component={NewPass} />
          <Route  exact path="/profile"  component={Profile}   />
        
         
          <Route path="/:somestring" component={Errors} />

        </Switch>
      </Router>
    );
  }
export default App