/*import { GoogleLogin, GoogleLogout } from 'react';*/
import { default as React, useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../../css/loginform.css';
import { Link } from 'react-router-dom'
import logo from '../../image/logo.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// const uiConfig = {
//     signInFlow: 'redirect',
//     signInSuccessUrl: '/',
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     ],

// };


function UpdatePassword() {

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
    const history = useHistory();
    const [error, setError] = useState("")
    const [errorNameExit, setErrorNameExit] = useState("")

    const handleSubmit = async () => {

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
                    if(result?.data?.resultCode == 1){
                      history.push("/login")
                    }else{
                        setError(result?.errors?.email)  
                        setErrorNameExit(result?.errors?.username) 
                    }
                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }

    }

    let inputUsername, inputEmail, inputPass, inputConfirmPass;
    if (nameError) {
        inputUsername = (
            <TextField error id="outlined-basic" label="Name" onChange={e => setName(e.target.value)} />
        )
    } else {
        inputUsername = (
            <TextField id="outlined-basic" label="Name" onChange={e => setName(e.target.value)} />
        )
    }
    if (emailError) {
        inputEmail = (
            <TextField error id="outlined-basic" label="Email" onChange={e => setEmail(e.target.value)} />
        )
    } else {
        inputEmail = (
            <TextField id="outlined-basic" label="Email" onChange={e => setEmail(e.target.value)} />
        )
    }
    if (passwordError) {
        inputPass = (
            <TextField error id="outlined-basic" type="password" label="Password" onChange={e => setPassword(e.target.value)} />
        )
    } else {
        inputPass = (
            <TextField id="outlined-basic" label="Password"  type="password" onChange={e => setPassword(e.target.value)} />
        )
    }
    if (confirmPassError) {
        inputConfirmPass = (
            <TextField error id="outlined-basic" label="Repeat Password"  type="password" onChange={e => setConfirmPass(e.target.value)} />

        )
    } else {
        inputConfirmPass = (
            <TextField id="outlined-basic" label="Repeat Password"  type="password" onChange={e => setConfirmPass(e.target.value)} />

        )
    }


    return (


        <div className="relative">
            < div className="w-screen h-screen pointer-events-none">
                <img className="w-full h-full relative select-none " src="https://images.unsplash.com/photo-1634092771737-644d65697039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1899&q=80" />

            </div>

            <div className=" ml-40 " id="banner" >


                <div id="login" className="border-2 border-gray-900 ">
                    <Link to="/"><img className="h-14 mt-2 ml-5  " src={logo} alt="logo" /></Link>
                    <h2>Sign Up </h2>
                    <p>Please input your information to use for the next login with account.</p>
                    {error != "" && <div className='text-red-600 ml-11 mb-5 text-xl'>{error} </div>}
                    {errorNameExit != "" && <div className='text-red-600 ml-11 mb-5 text-xl'>{errorNameExit} </div>}
                    {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Username is not short more 6 character </div>}
                    {emailError && <div className='text-red-600 ml-11 mb-5 text-xl'>Email must be valid</div>}
                    {passwordError && <div className='text-red-600 ml-11 mb-5 text-xl'>Pass is not short more 6 character </div>}
                    {confirmPassError && <div className='text-red-600 ml-11 mb-5 text-xl'>Repeat password must be same password </div>}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {inputUsername}
                        {inputEmail}
                        {inputPass}
                        {inputConfirmPass}
                    </Box>
                    <input type="submit" className="cursor-pointer" id="log" value="Register" onClick={handleSubmit}
                    /><br />

                    <div className="mb-5">If you have account <Link to="/login" className="text-xanh ">Sign In</Link></div>

                </div>

            </div>
        </div>

    );


}


export default UpdatePassword;