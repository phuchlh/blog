import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Footer from "../../Footer";
import Header from '../../Header';
import Logo from '../../image/logo.png';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextFieldInput } from '../../TextFieldInput';
import { ErrorMessage } from 'formik';
import { getVendorPrefixedName } from "rsuite/node_modules/dom-lib";
import Search from "../Post/Search";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile(props) {
    const history = useHistory();

    <Route exact path="/profile">
        {localStorage.getItem(`user-token`) ? <Redirect to="/profile" /> : history.push("/login")}
    </Route>

    
    const [postList, setpostList] = useState([]);
    const [myPost, setMyPost] = useState([])
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [allErrorr, setAllErrorr] = useState(false)
    const [nameErrorr, setNameErrorr] = useState(false)
    const [phoneErrorr, setPhoneErrorr] = useState(false)
    const [message, setMessage] = useState('')
    const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    const validName = new RegExp("(?=.{5,30}$)");
    let body;
    useEffect(() => {
        setEmail(props?.location?.state?.name?.email)
        setName(props?.location?.state?.name?.username)
        setPhone(props?.location?.state?.name?.phone)
        setGender(props?.location?.state?.name?.gender)
    }, [props]);
    useEffect(() => {
        if (localStorage.getItem(`user-token`)) {
            featchUser()
            featchPostUser()
        }
    }, []);

    async function featchPostUser() {
        try {
            const requestURL = ` http://127.0.0.1:8000/post/search_by_user_id?id=${localStorage.getItem('id-token')}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;
            setMyPost(responseJSON);
            return data
        } catch (error) {
        }
    }
    async function featchUser() {
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
            const { data } = responseJSON;
            setpostList(responseJSON);
            return data
        } catch (error) {
    
        }
    }


    const handleUpdateClick = async () => {

        if (name != undefined && name != ""
            && phone != undefined && phone != ""
            && gender != undefined && gender != ""
        ) {
            setAllErrorr(false)
            if (validName.test(name)) {
                setNameErrorr(false)
                if (validPhone.test(phone)) {
                    setPhoneErrorr(false)
                    body = {
                        id: localStorage.getItem('id-token'),
                        email: props?.location?.state?.name?.email,
                        username: name,
                        phone: phone,
                        gender: gender,
                        avatar: null,
                        roleName_id: '1',
                        password: props?.location?.state?.name?.password
                    }

                    let res = await fetch("http://127.0.0.1:8000/auth/account/update", {
                        method: `PUT`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                        },
                        body: JSON.stringify(body)

                    }).then(res => res.json())
                        .then(result => {
                           
                            if (result?.resultCode === 1) {
                                setOpen(true)
                                setMessage("update thanh công")
                                featchUser()
                                //props?.location.onReload()
                                alert("update Thành Công")
                                history.push("/")
                                window.location.reload()
                            } else {
                                alert("update ko thành công")
                            }
                        }

                        )
                        .catch((error) => {
                            throw ('Invalid Token')
                        })
                    return body
                } else { setPhoneErrorr(true) }
            } else { setNameErrorr(true) }
        } else {
            setAllErrorr(true)
        }


    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };




    function stringAvatar(name) {
        return {

            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    let data69;
    let data70;
    let data71;
    if (allErrorr == false) {
        data69 = (
            <FormControl

                fullWidth className="w-72" >
                <InputLabel >sex</InputLabel>
                <Select
                    defaultValue={props?.location?.state?.name?.gender}
                    className="w-72"
                    label="Age"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="false">Female</MenuItem>
                    <MenuItem value="true">Male</MenuItem>

                </Select>
            </FormControl>
        )
        if (nameErrorr) {
            data70 = (
                <TextField className=" w-72 bg-transparent "
                    defaultValue={props?.location?.state?.name?.username}
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    error
                />)
        } else {
            data70 = (
                <TextField className=" w-72 bg-transparent "
                    defaultValue={props?.location?.state?.name?.username}
                    label="Name"
                    onChange={e => setName(e.target.value)}
                />
            )
        }
        if (phoneErrorr) {
            data71 = (
                <TextField className=" w-72 bg-transparent "
                    defaultValue={props?.location?.state?.name?.phone}
                    label="Phone"
                    onChange={e => setPhone(e.target.value)}
                    error
                />
            )
        } else {
            data71 = (
                <TextField className=" w-72 bg-transparent "
                    defaultValue={props?.location?.state?.name?.phone}
                    label="Phone"
                    onChange={e => setPhone(e.target.value)}
                />
            )
        }

    } else {
        data69 = (
            <FormControl
                error
                fullWidth className="w-72" >
                <InputLabel >sex</InputLabel>
                <Select
                    defaultValue={props?.location?.state?.name?.gender}
                    className="w-72"
                    label="Age"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="false">Female</MenuItem>
                    <MenuItem value="true">Male</MenuItem>

                </Select>
            </FormControl>
        )
        data70 = (
            <TextField className=" w-72 bg-transparent "
                defaultValue={props?.location?.state?.name?.username}
                label="Name"
                onChange={e => setName(e.target.value)}
                error
            />
        )
        data71 = (
            <TextField className=" w-72 bg-transparent "
                defaultValue={props?.location?.state?.name?.phone}
                label="Phone"
                onChange={e => setPhone(e.target.value)}
                error
            />
        )
    }
    return (
        <div className="mt-14 " >
            <Header>
                <h2 className="ml-36 text-5xl mt-24 font-bold  mb-6   ">    Profile</h2>
                <div role="presentation" className="ml-44 my-5" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="hover:underline" color="inherit" to="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Profile</Typography>
                    </Breadcrumbs>
                </div>


                <div className=" grid grid-cols-7 bg-layoutforadmin mx-250  rounded-t-2xl      gap-4 " >

                    <div className="text-center col-span-3 mx-auto mt-16   ">
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt="Remy Sharp"
                                sx={{ width: 320, height: 320 }}
                            >  <p className="text-5xl">{props?.location?.state?.name?.username}</p>  </Avatar>
                        </Stack>
                    </div>
                    <div className="font-bold my-4 col-span-4  w-full ">
                        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} className="float-left w-screen">
                            <Alert onClose={handleClose} severity="success" className="float-left" sx={{ width: "200%", float: "right" }}>
                                {message}
                            </Alert>
                        </Snackbar>


                        <div className="pl-16 mt-12 ml-20">

                            {allErrorr && <div className='text-red-600  mb-5 text-xs'> Please enter all information!</div>}

                            <div className="mb-8">
                                <TextField
                                    className="w-72 "
                                    disabled
                                    id="outlined-disabled"
                                    label="Email"
                                    value={email} />
                            </div>
                            <div className="mb-8">
                                {data70}
                            </div>
                            <div className="mb-8">
                                {data71}
                            </div>
                            {data69}

                            <input type="submit" value="Update" onClick={handleUpdateClick}
                                className="h-8 w-32 bg-red-500 mt-4 mb-12 ml-40 cursor-pointer rounded-2xl text-white" />

                            <br />


                            <div>
                            </div>

                        </div>
                    </div>

                </div>


                <Footer />
            </Header>
        </div>

    );

}

export default Profile;