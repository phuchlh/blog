
import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import logo from './image/logo.png';
function Header(props) {
  const [openAction, setOpenAction] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenAction((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenAction(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenAction(false);
    } else if (event.key === 'Escape') {
      setOpenAction(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openAction);
  React.useEffect(() => {
    if (prevOpen.current === true && openAction === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openAction;
  }, [openAction]);
  let buttons;
  let mentorButtons;
  let adminDashboardButtons;
  let buttonsSignin;
  let buttonsSignup;
  function handleLogoutClick() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('id-token');
  }
  const [postList, setpostList] = useState([]);
  const [name, setName] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(`user-token`)) {
      featchPostList()
    }
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
  function stringAvatar(name) {
    return {

      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  if (localStorage.getItem(`user-token`)) {
    buttons = (
      <div className="t  ml-1450 absolute mt-3  ">
        <li>
          <NavLink
            activeStyle={{ backgroundColor: 'black' }}
            to={{
              pathname: "/profile",
              onReload: () => featchPostList(),
              state: {
                name: postList
              }
            }} className=" " >
            <div className="border-2  hover:bg-fpt border-white rounded-5xl  mt-1 p-1   h-12 pr-3">
              <p className="float-right text-sm mt-2  ml-4 ">{postList.username}</p>
              {/* <img src={postList.avatar} */}
              <Stack direction="row" spacing={2}>
                <Avatar >{name.slice(0, 1)}  </Avatar>
              </Stack>
            </div>
            <ul id="subnav" className=" border-2 float-left bg-white  text-center  p-1   pr-3" >

              <li className="w-full h-56 hover:bg-fpt "><Link to="/" className=" " onClick={handleLogoutClick}><p className="leading-56">Logout</p></Link></li>
            </ul>
          </NavLink>

        </li>
      </div>
    )


    if (postList.is_superuser == true) {
      adminDashboardButtons = (
        <NavLink activeStyle={{ backgroundColor: 'white' }} to="/admindashboard/user" className="my-link ml-20 leading-80 "><Button
          id="composition-button"
          aria-haspopup="true"

        >
          <p className="text-gray-900"> Admin Dashboard</p>

        </Button></NavLink>)
    }
    // else if (postList.roleID == '2') {
    //   adminDashboardButtons = (<NavLink activeStyle={{ backgroundColor: 'white' }} to="/MentorDashboard " className="my-link leading-80"><li><p>Mentor Dashboard</p></li></NavLink>)
    // }

  } else {
    buttonsSignin = (
      <Link to="/login" className=" h-40px bg-fpt  ml-1190 absolute  mt-5 "><Button
        id="composition-button"
        aria-haspopup="true"

      >
        <p className="text-gray-900"> Sign In</p>

      </Button></Link>
    )

    buttonsSignup = (
      <Link to="/updatepassword" className="  h-40px   absolute ml-1450  mt-5 "><Button
        id="composition-button"
        aria-haspopup="true"

      >
        <p className="text-gray-900"> Sign Up</p>

      </Button></Link>
    )
  }


  return (

    <div >

      <div id="nav" className="" >

        <Link to="/"><img className="h-20 w-72  absolute" src={logo} alt="logo" /></Link>

        <ul id="header-app-store" className=" mx-auto my-auto justify-center" >
          <NavLink activeStyle={{ color: '#6495ED', height: "80px" }} exact to="/" className="my-link ml-20  leading-80"><Button
            id="composition-button"
            aria-haspopup="true"

          >
            <p className="text-gray-900"> Home</p>

          </Button></NavLink>

          <NavLink activeStyle={{ color: '#000000', height: "80px" }} to="/aboutus" className="my-link ml-20 leading-80"><Button
            id="composition-button"
            aria-haspopup="true"
          >
            <p className="text-gray-900"> About Us</p>
          </Button></NavLink>
          <div className="my-link ml-20 leading-80 text-3xl">
            <div className="">
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={openAction ? 'composition-menu' : undefined}
                aria-expanded={openAction ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <p className="text-gray-900"> Post</p>
              </Button>
            </div>
            <Popper
              open={openAction}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openAction}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <Link className="hover:underline" color="inherit" to="/post/mypost">
                          <MenuItem onClick={handleClose}>My Post</MenuItem>
                        </Link>
                        <Link className="hover:underline" color="inherit" to="/post/allPost">
                          <MenuItem onClick={handleClose}>All Post</MenuItem>
                        </Link>
                        <Link className="hover:underline" color="inherit" to="/post/member">
                          <MenuItem onClick={handleClose}>Search People</MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          {adminDashboardButtons}
          {buttonsSignin}
          {buttonsSignup}
          {buttons}
        </ul>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );


}
export default Header;