import { default as React, useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from '../../Header';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
function Post(props) {
  const history = useHistory();

  <Route exact path="/profile">
    {localStorage.getItem(`user-token`) ? <Redirect to="/post" /> : history.push("/login")}
  </Route>
  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  function showModal(accountData, roleData, specData) {
    setShow(true);
    setIsClicked(true);
  };
  function hideModal() {
    setShow(false);
    setIsClicked(true);
  };
  useEffect(() => {
    if (!show) {
    }
  }, [show])
  return (
    <div className="mt-20  ">
      <Header>
        <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> Post</h2>
        <div role="presentation" className="ml-44 mt-5" >
          <Breadcrumbs aria-label="breadcrumb">
            <Link className="hover:underline" color="inherit" to="/">
              Home
            </Link>
            <Typography color="text.primary">Post</Typography>
          </Breadcrumbs>
        </div>
     
        <div className=" mx-32 bg-xam gap-8 rounded-md mt-12">
          <div className="grid grid-cols-3">
            <NavLink activeStyle={{ color: '#2596be' , height: "80px" }} exact to="/post/mypost" className="justify-center items-center mt-5 mx-auto  mb-16">
              <HomeIcon fontSize="large" />
            </NavLink>
            <NavLink activeStyle={{  color: '#2596be', height: "80px" }} exact to="/post/allpost" className="justify-center items-center mt-5 mx-auto  mb-16">
              <GroupsIcon fontSize="large" />
            </NavLink>
            <NavLink activeStyle={{  color: '#2596be', height: "80px" }}  to="/post/member" className="justify-center items-center mt-5 mx-auto  mb-16">
              <SearchIcon fontSize="large" />
            </NavLink>
          </div>
          <div >
            {props.children}
          </div>

        </div>

        <Footer />
      </Header>
    </div>
  )
} export default Post