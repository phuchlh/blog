import React, { Component, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../image/logo.png'
import "../../css/animation.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export default function Admin(props) {

    const history = useHistory();

    <Route exact path="/profile">
        {localStorage.getItem(`user-token`) ? <Redirect to="/admindashboard/user" /> : history.push("/login")}
    </Route>

    function handleLogoutClick() {
        localStorage.removeItem('user-token');
        localStorage.removeItem('id-token');
    }
    const [postList, setpostList] = useState([]);
    const [name, setName] = useState("");
    useEffect(() => {
        featchPostList()
    }, []);
    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/auth/account/get_account_by_id?id=${localStorage.getItem('id-token')}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setpostList(responseJSON);
            setName(responseJSON?.username)
           
            return data
        } catch (error) {
           
        }
    }


    return (
        <div className=" grid grid-cols-6 ">

            <div className=" h-screen bg-fpt col-span-1  grid grid-rows-6 ">

                <Link to="/"><img src={Logo} alt="logo" className="row-span-3 p-7" /></Link>

                <div className="row-span-5  ">

                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold", paddingTop: "21px", paddingBottom: "21px" }} to="/admindashboard/user" className="my-link " >
                        <div className=" h-60 leading-60  w-full " id="cool-link">

                            <AccountCircleIcon className="ml-60 -mt-1 mr-5 " /><i className="text-lg font-bold"> Account</i>
                        </div>
                    </NavLink>


                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold", paddingTop: "21px", paddingBottom: "21px" }} to="/admindashboard/post" className="my-link"  >
                        <div className=" mt-6 h-60 leading-60 w-full" id="cool-link">
                            <ArticleIcon className="ml-60 -mt-1 mr-5 " /><i className="text-lg font-bold"> Post</i>
                        </div>
                    </NavLink>
                </div>
                <div className="bg-gray-700 h-60 leading-60 cursor-pointer  text-white ">
                    <Link to="/" className=" " onClick={handleLogoutClick}> <p className="ml-60  " >Logout</p></Link>
                </div>
            </div>



            <div className="col-span-5 bg-gray-100 ">
                <div>
                    <div
                        className="rounded-full w-12 h-12 mr-8 my-5 float-right" >
                        <Stack direction="row" spacing={2}>
                            <Avatar >{name.slice(0, 1)}  </Avatar>
                        </Stack>
                    </div>
                    <p className="float-right clear-left mr-3 mt-30"> {name} </p>
                </div>
                <div>
                    {props.children}
                </div>
            </div>

        </div>
    )
}