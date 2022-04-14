
import { default as React, useEffect, useState } from "react";
import Post from "./Post";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search'
import Modal from '../../Modal';
import ModalePost from './ModalePost';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ListPost(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [message, setMessage] = useState('');
    const [postList, setPostList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/post/search_by_title?search=${search}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data } = responseJSON;

            setPostList(responseJSON);

            return data
        } catch (error) {

        }

    }
    async function featchUserList() {
        try {

            let response = await fetch(`http://127.0.0.1:8000/auth/account/search?search=`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;
            setUserList(responseJSON);


        } catch (error) {

        }

    }
    const [search, setSearch] = useState("");
    useEffect(() => {
        featchPostList()
        featchUserList()
    }, [search]);



    const filterList1 = postList.filter(post => {
        if (post?.status === "ACTIVE") {
            return post
        }
    })


    const callbackSearch = (childData) => {
        setSearch(childData)

    };
    // let buttons;

    //         buttons = (
    //           <div className="t  ml-1450 absolute mt-3  ">
    //             <li>
    //                 <div className="border-2  hover:bg-fpt border-white rounded-5xl  mt-1 p-1   h-12 pr-3">
    //                   ...
    //                 </div>
    //                 <ul id="subnav" className=" border-2 float-left bg-white  text-center  p-1   pr-3" >
    //                   <li className="w-full h-56 hover:bg-fpt ">Edit</li>
    //                 </ul>
    //             </li>
    //           </div>
    //         )

    let sortFirstDay = filterList1.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);

    })

    var curDate = new Date();
    var curDay = curDate.getDate();
    var curMonth = curDate.getMonth() + 1;
    var curYear = curDate.getFullYear();
    let notFount;
    notFount = (
        <div className="text-center text-5xl w-full ml-650 font-bold text-red-600">
            Not Found Post!
        </div>
    );
    const [selectedData, setSelectedData] = useState(undefined)
    function showModal(data) {
        setSelectedData(data)
        setShow(true);
        setIsClicked(true);
    };
    function hideModal() {
        setShow(false);
        setIsClicked(true);
        setSelectedData(undefined);
    };
    useEffect(() => {
        if (!show) {
        }
    }, [show])

    const callbackFunction = (childData, alert) => {
        setMessage(childData)

        setOpen(true)
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <Post >
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} className="float-left w-screen">
                <Alert onClose={handleClose} severity="success" >
                    {message}
                </Alert>
            </Snackbar>
            <div className="float-right -mt-16 mr-20  ">

                <Search parentCallback={callbackSearch} />
            </div>

            <div className="grid grid-cols-3 mt-8 pt-12 clear-both">
                <Modal show={show} handleClose={hideModal} className="mb-5">
                    <ModalePost data={selectedData} parentCallback={callbackFunction} onModal={() => setShow(false)} onDelete={() => featchPostList()} />
                </Modal>
                {sortFirstDay != "" ? sortFirstDay.map((post, index) => {

                    return (
                        <div key={post.id} className='justify-center items-center mx-auto mb-16 '>
                            <Card sx={{ width: 345 }} >
                                <CardHeader
                                    avatar={
                                        userList.map(name => {
                                            if (name?.id == post?.idAccount) {
                                                return (<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {name?.username.slice(0, 1)}
                                                </Avatar>)
                                            }
                                        })
                                    }
                                    title={userList.map(name => {
                                        if (name?.id == post?.idAccount) {
                                            return (
                                                < NavLink
                                                activeStyle={{ color: '#2596be' }}
                                                to={{
                                                    pathname: "/post/member/memberview",
                                                    state: {
                                                        name: name,
                                                    }
                                                }} ><Typography variant="h5"  > {name?.username} </Typography></NavLink>
                                            )
                                        }
                                    })}
                                    subheader={post?.createDate.substring(8, 10) < curDay && post?.createDate.substring(5, 7) <= curMonth && post?.createDate.substring(0, 4) <= curYear
                                        ? post?.createDate.substring(8, 10) + "/" + post?.createDate.substring(5, 7) + "/" + post?.createDate.substring(0, 4)
                                        : post?.createDate.substring(11, 19) + " today"
                                    }
                                    action={post?.idAccount == localStorage.getItem('id-token')
                                        ? <div className="text-2xl ml-5 cursor-pointer   mr-8" onClick={() => showModal(post)} >
                                            ...
                                        </div>
                                        : ""}


                                />
                                <CardMedia
                                    className="h-72 "

                                    height="194"
                                    image={post?.image}
                                />
                                <CardContent className="">
                                    <Link to={{
                                        pathname: "/post/view",
                                        state: {
                                            name: post,
                                        }
                                    }} ><Typography variant="h5" > {post?.title.length <= 20 ? post?.title : post?.title.slice(0, 20).concat("...")} </Typography></Link>
                                </CardContent>
                            </Card>
                        </div>

                    )


                }) : notFount}
            </div>


        </Post>
    );
}  