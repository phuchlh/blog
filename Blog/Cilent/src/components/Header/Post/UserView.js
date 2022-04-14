
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

export default function UserView(props) {
    const [postList, setPostList] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        featchPostList()
        setName(props?.location?.state?.name?.username)
    }, [props]);
    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/post/search_by_user_id?id=${props?.location?.state?.name?.id}`;
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

    const filterList1 = postList.filter(post => {
        if (post?.status === "ACTIVE") {
            return post
        }
    })


    let sortFirstDay = filterList1.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);

    })

    const [status, setStatus] = useState("")
    var curDate = new Date();
    var curDay = curDate.getDate();
    var curMonth = curDate.getMonth() + 1;
    var curYear = curDate.getFullYear();
    let notFount;
    notFount = (
        <div className="text-center text-5xl w-full  font-bold text-red-600">
            {name} doesn't have any Posts!
        </div>
    );
    console.log("prop của view member", props?.location?.state?.name?.username)
    return (
        <Post >

            <CardHeader
                avatar={
                    <Avatar sx={{ width: 180, height: 180, bgcolor: red[500] }} aria-label="recipe">
                        <p className="text-9xl">{props?.location?.state?.name?.username.slice(0, 1)}</p>
                    </Avatar>

                }
                title={<p className="font-extrabold text-3xl"> {props?.location?.state?.name?.username} </p>}
                className="ml-80 mb-24"
            />
            <div className="grid grid-cols-1">

                {sortFirstDay != "" ? sortFirstDay?.map((post, index) => {

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


                }) : notFount}
            </div>

        </Post>
    );
}  