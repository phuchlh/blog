import React, { Component, useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../image/logo.png'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

export default function ModalForPost(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)
    const validName = new RegExp("(?=.{6,30}$)");
    const validPass = new RegExp("(?=.{6,30}$)");
    const validEmail = new RegExp("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$");
    const [role, setRole] = useState("")
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [all, setAll] = useState([])
    const [id, setId] = useState("")
    const [subject, setSubject] = useState([]);
    const [specspecialize, setSpecialize] = useState([]);
  
    useEffect(() => {
        if (props?.isClickedParent) {
            setId(props?.isClickedParent?.id);
            setRole(props?.isClickedParent?.roleID)
        }
    }, [props?.isClickedParent?.id, props?.isClickedParent?.roleID])

    useEffect(() => {
        if (props?.setIsClicked) {
            featchPostList()
        }
    }, [props?.role]);




    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/post/searchid?id=${props?.role}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;
            setAll(responseJSON);
            setEmail(responseJSON.email);
            setName(responseJSON.username);
            setRole(responseJSON.roleName_id);
            setGender(responseJSON.gender);
            setPhone(responseJSON.phone);
           
            return data
        } catch (error) {
        
        }
    }

    async function createAccount() {
        if (!validName.test(name)) {
            setNameError(true)
            setEmailError(false)
            setPasswordError(false)
            setConfirmPassError(false)
        }
        else if (!validEmail.test(email)) {
            setNameError(false)
            setEmailError(true)
            setPasswordError(false)
            setConfirmPassError(false)
        }
        else if (!validPass.test(password)) {
            setNameError(false)
            setEmailError(false)
            setPasswordError(true)
            setConfirmPassError(false)
        }
        else if (confirmPass !== password) {
            setNameError(false)
            setEmailError(false)
            setPasswordError(false)
            setConfirmPassError(true)
        } else {
            setNameError(false)
            setEmailError(false)
            setPasswordError(false)
            setConfirmPassError(false)
            const body = {
                username: name,
                email: email,
                password: password
            };
            let res = await fetch("http://127.0.0.1:8000/auth/register/", {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(body)

            }).then(res => res.json())
                .then(result => {
                    props.onDelete()
                    props.onModal()
                    props.onDelteModal()
                    props.parentCallback("Create successfully");
                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }
        // const body = {
        //     username: name,
        //     email: email,
        //     password: all?.password
        // };
        // console.log(body, "---------")
        // const res = await fetch(`http://127.0.0.1:8000/auth/account/update`, {
        //     method: `PUT`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
        //     },
        //     body: JSON.stringify(body)
        // }).then(res => res.json())
        //     .then(result => {

        //         if (result) {
        //             if (result?.resultCode == 1) {
        //                 props.onUpdate()
        //                 props.onModal()
        //                 props.parentCallback("Update Successfully");
        //             }

        //         } else {
        //             alert("update thất bại")
        //         }
        //         return res

        //     })
        //     .catch((error) => {
        //         throw ('Invalid Token')
        //     })
        // return body

    }

    async function updateAccount() {
        const body = {

            avatar: null,
            email: email,
            gender: gender,
            id: all?.id,
            password: all?.password,
            phone: phone,
            roleName_id: role,
            username: name

        };
       
        const res = await fetch(`http://127.0.0.1:8000/auth/account/update`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.resultCode == 1) {
                        props.onUpdate()
                        props.onModal()
                        props.parentCallback("Update Successfully");
                    }

                } else {
                    alert("update thất bại")
                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }

    // const inforSubject = subject?.map( name => {return name.name})

    console.log("props cua modal post:", props)
    let roleData



    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Post Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">Admin can view all information Post but can't Update</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">
                {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Username is not short more 6 character </div>}
                {emailError && <div className='text-red-600 ml-11 mb-5 text-xl'>Email must be valid</div>}
                {passwordError && <div className='text-red-600 ml-11 mb-5 text-xl'>Pass is not short more 6 character </div>}
                {confirmPassError && <div className='text-red-600 ml-11 mb-5 text-xl'>Repeat password must be same password </div>}
                <table className="text-gray-500">
                    <tbody >
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Id:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                                <p type="disabled" className="font-normal pl-10 text-gray-900 outline-none " >
                                    {all?.id}
                                </p>
                            </td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Name User:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                               
                                {props?.nameUser?.map((userName, index) => {
                                    if (userName?.id == all?.idAccount) {

                                        return <p key={userName?.id} type="disabled" className="font-normal pl-10 text-gray-900 outline-none " >
                                            {userName?.username}
                                        </p>
                                    }
                                })}

                            </td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Status:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                                <p type="disabled" className="font-normal pl-10 text-gray-900 outline-none " >
                                    {all?.status == "ACTIVE" ? "Active" : "Inactive"}
                                </p>
                            </td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Title:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                                <p type="disabled" className="font-normal pl-10 text-gray-900 outline-none " >
                                    {all?.title}
                                </p>
                            </td>
                        </tr>
                        <tr className=" h-50 border-b-2 ">
                            <th className="text-left pb-85  "> Content:  </th>
                            <td className="pt-3"><textarea
                                value={all?.content}
                                className="font-normal h-32 w-full resize-none pl-5  text-gray-900 outline-none " placeholder="Input Content..."
                            /></td>
                        </tr>
                        <tr className=" mb-7 h-50 ">
                            <th className="text-left  "> Image:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">
                                
                                <Card sx={{ maxWidth: 150 }} >
                               <div className="pt-5">
                                <CardMedia
                                    component="img"
                                    height="50"
                                    image={all?.image}
                                    alt="Paella dish"
                                // className='h-48'
                                />
                                </div>
                                </Card>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
         

        </div >
    )
}

