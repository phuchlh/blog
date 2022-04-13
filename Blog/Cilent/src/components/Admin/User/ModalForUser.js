import React, { Component, useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'

import Logo from '../../image/logo.png'



export default function ModalForUser(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneErrorr, setPhoneErrorr] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)
    const validName = new RegExp("(?=.{6,30}$)");
    const validPass = new RegExp("(?=.{6,30}$)");
    const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    const validEmail = new RegExp("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$");
    const [role, setRole] = useState(false)
    const [gender, setGender] = useState("")
    const [active, setActive] = useState("")
    const [all, setAll] = useState([])
    const [id, setId] = useState("")
    const [subject, setSubject] = useState([]);
    const [specspecialize, setSpecialize] = useState([]);
    
    useEffect(() => {
        if (props?.isClickedParent) {
            setId(props?.isClickedParent?.id);
            setRole(props?.isClickedParent?.is_superuser)
        }
    }, [props?.isClickedParent?.id, props?.isClickedParent?.roleID])

    useEffect(() => {
        if (props?.setIsClicked) {
            featchPostList()
        }
    }, [props?.role]);




    async function featchPostList() {
        try {
            const requestURL = `http://127.0.0.1:8000/auth/account/get_account_by_id?id=${props?.role}`;
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
            setRole(responseJSON.is_superuser);
            setGender(responseJSON.gender);
            setPhone(responseJSON.phone);
            setActive(responseJSON.is_active);
         
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
        if (!validName.test(name)) {
            setNameError(true)
            setPhoneErrorr(false)
        }
        else if (!validPhone.test(phone)) {
            setNameError(false)
            setPhoneErrorr(true)
        } else {
            setNameError(false)
            setPhoneErrorr(false)
            const body = {

                avatar: null,
                email: email,
                gender: gender,
                id: all?.id,
                password: all?.password,
                phone: phone,
                is_superuser: role,
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
    }

    

    

    let AccountView;
    if (props?.role === undefined) {
        AccountView = (
            <table className="text-gray-500">
                <tbody >
                    <tr className="border-b-2 h-50 ">
                        <th className="text-left  "> Name:  </th>
                        <td className="font-normal pl-10 text-gray-900 outline-none">
                            <input className="font-normal pl-10 text-gray-900 outline-none " placeholder="Input  Name..."
                                onChange={e => setName(e.target.value)} />
                        </td>
                    </tr>
                    <tr className="border-b-2 h-50 ">
                        <th className="text-left  "> Email:  </th>
                        <td className="font-normal pl-10 text-gray-900 outline-none">
                            <input autocomplete="off" className="font-normal pl-10 text-gray-900 outline-none " placeholder="Input  Email..."
                                onChange={e => setEmail(e.target.value)} />
                        </td>
                    </tr>
                    <tr className="border-b-2 h-50 ">
                        <th className="text-left  "> Password:  </th>
                        <td className="font-normal pl-10 text-gray-900 outline-none">
                            <input autocomplete="off" className="font-normal pl-10 text-gray-900 outline-none " type="password" placeholder="Input  Password..."
                                onChange={e => setPassword(e.target.value)} />
                        </td>
                    </tr>
                    <tr className="border-b-2 h-50 ">
                        <th className="text-left  "> Repeat Password:  </th>
                        <td className="font-normal pl-10 text-gray-900 outline-none">
                            <input type="password" className="font-normal pl-10 text-gray-900 outline-none " placeholder="Input Repeat Password..."
                                onChange={e => setConfirmPass(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    } else {
        AccountView = (<table className="text-gray-500">
            <tbody >
            <tr className="border-b-2 h-50  ">
                    <th className="text-left  "> Account:  </th>
                    <td className="font-normal pl-10 text-gray-900 outline-none">{active == true ? "Active" : "Inactive" }</td>
                </tr>
                <tr className="border-b-2 h-50 ">
                    <th className="text-left  "> Email:  </th>
                    <td className="font-normal pl-10 text-gray-900 outline-none">{email}</td>
                </tr>
                <tr className="border-b-2 h-50 ">
                    <th className="text-left  "> Name:  </th>
                    <td className="font-normal pl-10 text-gray-900 outline-none">
                        <input className="font-normal pl-10 text-gray-900 outline-none " value={name} placeholder="Input  Name..."
                            onChange={e => setName(e.target.value)} />
                    </td>
                </tr>

                <tr className="border-b-2 h-50 ">
                    <th className="text-left  "> Role:  </th>
                    <td className="">
                        <select value={role} onChange={e => setRole(e.target.value)} className="font-normal  pl-3  outline-none ">
                            <option className=" text-gray-400 hidden text-xl" >Select Role...</option>
                            <option value="true">Admin</option>
                            <option value="false">User</option>
                        </select></td>
                </tr>

                <tr className="border-b-2 h-50 ">
                    <th className="text-left  "> Gender:  </th>
                    <td className="font-normal pl-10  outline-none">
                        <select value={gender} onChange={e => setGender(e.target.value)} className="font-normal  pl-3 outline-none ">
                            <option className=" text-gray-400 hidden text-xl" >Select gender...</option>
                            <option className=" text-black-600  " value="0">Famale</option>
                            <option className=" text-black-600 " value="1">Male</option>
                        </select>
                    </td>
                </tr>

                {/* <tr className="border-b-2 h-50 ">
                <th className="text-left  "> Address:  </th>
                <td className="font-normal pl-10 text-gray-900 outline-none">{information?.address}</td>
            </tr> */}
                <tr className="border-b-2 h-50 ">
                    <th className="text-left  "> Phone:  </th>
                    <td className="font-normal pl-10 text-gray-900 outline-none">
                        <input className="font-normal pl-10 text-gray-900 outline-none " placeholder="Input  Phone..." value={phone}
                            onChange={e => setPhone(e.target.value)} />
                    </td>
                </tr>


            </tbody>

        </table>)
    }

    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> User Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">Admin can view User information and update User to Mentor</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">
                {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Username is not short more 6 character </div>}
                {emailError && <div className='text-red-600 ml-11 mb-5 text-xl'>Email must be valid</div>}
                {passwordError && <div className='text-red-600 ml-11 mb-5 text-xl'>Pass is not short more 6 character </div>}
                {confirmPassError && <div className='text-red-600 ml-11 mb-5 text-xl'>Repeat password must be same password </div>}
                {phoneErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'>phone must be valid</div>}
                {AccountView}
            </div>
            <div className=" cursor-pointer mt-8 w-full h-14 leading-56 text-4xl text-center  float-right bg-black hover:text-black hover:bg-blue-500 text-red-50" >
                {props?.role === undefined ? <p onClick={createAccount}>Create</p> : <p onClick={updateAccount}>Update</p>}
            </div>

        </div>
    )
}

