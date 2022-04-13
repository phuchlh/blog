
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
import Modal from '../../Modal';
import ModalePost from './ModalePost';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MyPost(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [postList, setPostList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [name, setName] = useState("");
    
    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/post/search_by_user_id?id=${localStorage.getItem('id-token')}`;
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
            let response = await fetch(`http://127.0.0.1:8000/auth/account/get_account_by_id?id=${localStorage.getItem('id-token')}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                }
            })
            const responseJSON = await response.json();
        
            const { data, pagination } = responseJSON;
            setUserList(responseJSON);
            setName(responseJSON?.username)
          
        } catch (error) {
           

        }

    }
    useEffect(() => {
        featchPostList()
        featchUserList()
    }, [open]);
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

    let sortFirstDay = postList.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);

    })
   
    const [status, setStatus] = useState("")
    var curDate = new Date();
    var curDay = curDate.getDate();
    var curMonth = curDate.getMonth() + 1;
    var curYear = curDate.getFullYear();
   
    async function deletePost(data) {
        if (data?.status == "ACTIVE") {
            setStatus("INACTIVE")
        } else {
            setStatus("ACTIVE")
        }

        const body = {
            id: data?.id,
            idAccount: data?.idAccount,
            status: (data?.status == "ACTIVE" ? "INACTIVE" : "ACTIVE")
        };

        
        const res = await fetch(`http://127.0.0.1:8000/post/delete_post`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(result => {
                 setOpen(true)
                setMessage("Change Status successfully");
            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }


    return (
        <Post >
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} className="float-left w-screen">
                <Alert onClose={handleClose} severity="success" >
                    {message}
                </Alert>
            </Snackbar>

            <CardHeader
                avatar={
                    <Avatar sx={{ width: 180, height: 180, bgcolor: red[500] }} aria-label="recipe">
                        <p className="text-9xl">{name.slice(0, 1)}</p>
                    </Avatar>

                }
                title={<p className="font-extrabold text-3xl"> {name} </p>}
                className="ml-80 mb-24"
            />

            <Card className='mx-400  h-32 -mt-12 mb-12 rounded-xl  '>
                <div className='ml-8 grid grid-cols-12 pt-9 '>
                    <div className="mt-3">
                        <Avatar sx={{ size: 300, bgcolor: red[500] }} aria-label="recipe">
                            {name.slice(0, 1)}
                        </Avatar>

                    </div>
                    <Modal show={show} handleClose={hideModal} className="mb-5">
                        <ModalePost data={selectedData} parentCallback={callbackFunction} onModal={() => setShow(false)} onDelete={() => featchPostList()} />
                    </Modal>
                    <button className='col-span-11 mr-16 bg-white rounded-xl h-12 mt-2  border-2 border-gray-300' onClick={() => showModal()}>
                        <p className='text-left text-gray-300  hover:text-gray-700 ml-5'>Create your post here ...</p>
                    </button>
                </div>
            </Card>
            <div className="grid grid-cols-1">
                {sortFirstDay?.map((post, index) => {
                
                        return (
                            <div key={post.id} className='justify-center items-center mx-auto mb-16 '>
                                <Card sx={{ width: 800 }} > 
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {name.slice(0, 1)}
                                            </Avatar>

                                        }
                                        title={name}
                                        action={
                                            <div className="grid grid-cols-2">
                                                <div className=" ml-12 mt-2" onClick={() => deletePost(post)}>
                                                    {post?.status == "ACTIVE" ? <PublicIcon /> : <PublicOffIcon />}
                                                </div>
                                                <div className="text-2xl ml-5 cursor-pointer   mr-8" onClick={() => showModal(post)} >
                                                    ...
                                                </div>

                                            </div>
                                        }

                                        subheader=
                                        //                                        
                                        {post?.createDate.substring(8, 10) < curDay && post?.createDate.substring(5, 7) <= curMonth && post?.createDate.substring(0, 4) <= curYear
                                            ? post?.createDate.substring(8, 10) + "/" + post?.createDate.substring(5, 7) + "/" + post?.createDate.substring(0, 4)
                                            : post?.createDate.substring(11, 19) + " today"
                                        }

                                    />

                                    <CardMedia
                                        className="h-96"
                                        component="img"
                                        height="194"
                                        image={post?.image}

                                    />
                                    <CardContent>
                                        <Link to={{
                                            pathname: "/post/view",
                                            state: {
                                                name: post,
                                            }
                                        }} ><Typography variant="h5" className="text-center" > {post?.title} </Typography></Link>

                                    </CardContent>
                                </Card>
                            </div>

                        )
                    
                })}
            </div>

        </Post>
    );
}  