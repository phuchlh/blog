/*import { GoogleLogin, GoogleLogout } from 'react';*/
import { default as React, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import '../../css/loginform.css';
import { Link } from 'react-router-dom'

import logo from '../../image/logo.png';

// const uiConfig = {
//     signInFlow: 'redirect',
//     signInSuccessUrl: '/',
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     ],

// };


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')

    const history = useHistory();

    async function loginIn() {

        const body = {
            email,
            password
        };
        let res = await fetch("http://127.0.0.1:8000/auth/login/", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer token',
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {
              
                if (result?.resultcode == 1) {
                    localStorage.setItem("user-token", result?.data?.tokens?.access);
                    localStorage.setItem("id-token", result?.data?.id);
        
                     history.push("/")
                } else {
                    alert("tài khoản hoặc mật khẩu sai kìa")
                //  setError(result?.detail)
                  
                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
      
    }


    

    return (
        <div className="relative">
            <div className="w-screen h-screen pointer-events-none">
                <img className="w-full h-full absolute select-none" src="https://images.unsplash.com/photo-1634092771737-644d65697039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1899&q=80" />

            </div>
            <div id="banner" className="relative z-20" >

                <div id="login" className="border-l-2 border-gray-900 border-t-2 border-b-2  ">
                <Link to="/"><img className="h-14 mt-2 ml-5  " src={logo} alt="logo"  /></Link>
                    <h2>Post Blog nhà quê</h2>
                    <h3>Login to your account. </h3>
                    <p>Sign in by entering the information below</p>

                    <div id="form-field">

                        <input  type="text" id={error == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setEmail(e.target.value)} />
                        <label className='ml-28' id={error == false ? 'form-label' : 'form-label-invalid'}>Email</label>
                    </div>
                    <div id="form-field">
                        <input type="password" id={error == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setPassword(e.target.value)} />
                        <label className='ml-28' id={error == false ? 'form-label' : 'form-label-invalid'}>Password</label>
                    </div>
                    {
                        error !== '' && <div className=" text-base text-red-600 mb-3">{error}</div>
                    }
                    <input type="submit" className="cursor-pointer" id="log" value="Login" onClick={loginIn}
                    /><br />
                    <div className="mb-6">If you do not have account <Link to="/updatepassword" className="text-xanh ">Sign Up</Link></div>
                    <div className="grid  grid-cols-7 ml-16  w-7/10 ">     
                            <hr   className='border-none h-1069 text-red-300 bg-red-300   w-32 col-span-3 rounded-md' />
                            <div className="-mt-7 ml-2  "> or </div>
                            <hr  className='border-none h-1069 text-red-300 bg-red-300   w-32 col-span-3 rounded-md' />
                    </div>
                    <div className="-mt-5">If you reset password <Link to="/resetpass" className="text-xanh ">click here</Link></div>
                    {/* <button id="gmail"  >
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />          </button> */}
                    {/* <GoogleLogin

                        className="w-7/10 "
                        clientId="1039209918487-4u4orng4ii1m9csn6ocn8jmav6aoq0bc.apps.googleusercontent.com"
                        buttonText="Login with Gmail"
                        onSuccess={(data) => {
                            if (data?.tokenObj?.id_token) {
                                loginGoogle(data?.tokenObj?.id_token)
                            } else {
                                alert('Login Error')
                            }
                        }}
                        onFailure={() => {
                            alert('Login Error')
                        }}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin> */}

                </div>
                <div id="img" className="w-full border-t-2 border-b-2 border-r-2 select-none border-gray-900 ">
                    <img id="book" src="https://images.unsplash.com/photo-1635096331084-87f3f64027d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />

                </div>
            </div>

        </div>
    );


}


export default Login

