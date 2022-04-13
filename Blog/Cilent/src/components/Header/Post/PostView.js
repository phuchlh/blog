import React, { Component, useState, useEffect } from "react";
import Header from '../../Header'
import Footer from "../../Footer";

import { useLocation, useHistory } from 'react-router-dom'
import MediaCard from "../../Card";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, NavLink } from 'react-router-dom';
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import ScrollToTop from "../../ScrollToTop";

export default function PostView(props) {
    <ScrollToTop />  
    const [accountDetail, setAccountDetail] = useState([]);
    const [accountBlog, setAccountBlog] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
        if (props?.location?.state?.name) {
            featchAccount(props?.location?.state?.name?.idAccount)
            featchPostAccount(props?.location?.state?.name?.idAccount)
            window.scrollTo(0, 0);
        } else {
            history.push("/post/allpost")
        }
    }, [props?.location?.state?.name]);
    async function featchAccount(id) {
        try {
            const requestURL = `http://127.0.0.1:8000/auth/account/get_account_by_id?id=${id}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setAccountDetail(responseJSON);

            return data
        } catch (error) {
           
        }
    }
    async function featchPostAccount(id) {
        try {
            const requestURL = `http://127.0.0.1:8000/post/search_by_user_id?id=${id}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setAccountBlog(responseJSON);

            return data
        } catch (error) {
            
        }
    }
    const filterList = accountBlog.filter(acc => {
        if (acc?.id !== props?.location?.state?.name?.id ) {
            return acc
        }
    })
    let sortFirstDay = filterList.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);

    })
    const sameBLog = sortFirstDay.slice(0, 4)

    return (
        <div className="mt-20 ">
            <Header >
                <div className="">
                    <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white font-serif uppercase    clear-both ">{props?.location?.state?.name?.title}</h2>
                    <Card  sx={{ minWidth: 500,  }} className="mx-44 mt-5">
                      
                            <CardMedia
                                        component="img"
                                        height="140"
                                        className="h-96 "
                                        image={props?.location?.state?.name?.image}    
                                    />
                    </Card>
                    <div role="presentation" className="ml-44 mt-5" >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="hover:underline" color="inherit" to="/">
                                Home
                            </Link>
                            <Link
                                className="hover:underline"
                                color="inherit"
                                to="/post/allpost"
                            >
                                Post
                            </Link>
                            <Typography color="text.primary">{props?.location?.state?.name?.title}</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className=' grid grid-cols-12 m-5 pt-5 '>
                        <div></div>
                        <div className="col-span-9 grid  ">
                            <div className="row-span-1  grid grid-cols-9">
                                <img src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/80258477_2385822061670642_3771683375601942528_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=mmkiX-c-CG4AX8Pbvym&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT--Qa1DWcLFqgASZTI4t76V7KxrqlIkNkqXLgwKohjTmA&oe=625F78FF"
                                    className="rounded-full ml-7 col-span-1  w-16 h-16  " />
                                <div>
                                    <p className=" -ml-7 text-xl font-bold mt-1">{accountDetail?.username}</p>
                                    <p className=" -ml-7 text-lg text-gray-400  -mt-2"> {props?.location?.state?.name?.createDate.substring(8, 10) + "/" + props?.location?.state?.name?.createDate.substring(5, 7) + "/" + props?.location?.state?.name?.createDate.substring(0, 4)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className=" text-5xl cursor-pointer text-center justify-center">{accountDetail?.id == localStorage.getItem('id-token') ? "..." : ""}</p>
                        </div>
                    </div>
                    <div className="mx-64 my-5 border-b-2 pb-8 border-xanhla">
                        {props?.location?.state?.name?.content}
                    </div>
                    <div className="mx-64">
                        <h2 className="ml-2 font-bold mb-12 text-2xl"> Bài viết cùng tác giả</h2>
                    </div>
                    <div className=" mx-64 grid grid-cols-2 gap-12 ">
                        {sameBLog.map((blog, index) => {
                            return (
                                <Card key={blog.id} sx={{ minWidth: 275 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        className="h-72"
                                        image={blog?.image}    
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {blog?.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Link to={{
                                        pathname: "/post/view",
                                        state: {
                                            name: blog
                                        }
                                    }} > <Button size="small">Learn More</Button></Link>
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </div>
                </div>

            </Header>

            <Footer />
        </div>
    );
}
