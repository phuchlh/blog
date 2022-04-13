/*import { GoogleLogin, GoogleLogout } from 'react';*/
import { default as React, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import '../../css/loginform.css';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import logo from '../../image/logo.png';



function NewPass() {

    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const validPassword = new RegExp("(?=.{7,13}$)");
    const [pwdError, setPwdError] = useState(false);
    const [pwcError, setPwcError] = useState(false);

    const [postList, setpostList] = useState([]);
    const [error, setError] = useState(false)
    const [mess, setMess] = useState('Vào Email để xác thực')
    const history = useHistory();

    const Reset = async () => {
        const body = {
            password,
            token: localStorage.getItem('reset_token'),
            uidb64: localStorage.getItem('uidb64')
        };
        if (!validPassword.test(password) && password !== confirmPassword) {
            setPwdError(true);
            setPwcError(true);
        }
        else {
            if (!validPassword.test(password)) {
                setPwdError(true);
                setPwcError(false);
            } else {
                if (password !== confirmPassword) {
                    setPwcError(true);
                    setPwdError(false);
                } else {
                    setPwdError(false);
                    setPwcError(false);


                    let res = await fetch("http://127.0.0.1:8000/auth/password-reset-complete", {
                        method: `PATCH`,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body)

                    }).then(res => res.json())
                        .then(result => {

                            if (result) {
                                localStorage.removeItem('reset_token');
                                localStorage.removeItem('email');
                                localStorage.removeItem('uidb64');
                                history.push("/login")
                            }
                        })
                        .catch((error) => {
                            throw ('Invalid Token')
                        })
                    return body

                }
            }
        }

    }
    return (
        <div className="relative">
            <div className="w-screen h-screen pointer-events-none">
                <img className="w-full h-full absolute select-none" src="https://images.unsplash.com/photo-1634092771737-644d65697039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1899&q=80" />
            </div>
            <div className=" ml-40 " id="banner" >
                <div id="login" className="border-2 border-gray-900 ">
                    <Link to="/"><img className="h-14 mt-2 ml-5  " src={logo} alt="logo" /></Link>
                    <h2>Reset Password </h2>
                    <p>Please input email next to reset your password .</p>

                    <TextField
                        className="w-230 mb-5"
                        disabled
                        id="outlined-disabled"
                        label="Disabled"
                        defaultValue={email} />
                    {pwdError && <div className="text-xs   text-red-600 mb-5  font-bold ">Length of password should be least  7</div>}
                    <div className='mt-7' id="form-field">
                        <input type="password" id={pwdError == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setPassword(e.target.value)} />
                        <label className='ml-28' id={pwdError == false ? 'form-label' : 'form-label-invalid'} >Password</label>
                    </div>
                    {pwcError && <div className="text-xs   text-red-600 mb-5 font-bold">Your password is not confirm</div>}
                    <div id="form-field">
                        <input type="password" id={pwcError == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setConfirmPassword(e.target.value)} />
                        <label className='ml-28' id={pwcError == false ? 'form-label' : 'form-label-invalid'} >Repait password</label>
                    </div>

                    <input type="submit" className="cursor-pointer" id="log" value="Reset" onClick={Reset} />
                </div>

            </div>



        </div>
    );


}


export default NewPass

