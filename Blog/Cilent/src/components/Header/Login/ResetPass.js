/*import { GoogleLogin, GoogleLogout } from 'react';*/
import { default as React, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import '../../css/loginform.css';
import { Link } from 'react-router-dom'

import logo from '../../image/logo.png';



function ResetPass() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [mess, setMess] = useState('Vào Email để xác thực')
    const history = useHistory();

    async function Reset() {

        const body = {
            email,
            redirect_url: "http://localhost:3000/Appointment_fe/newpass"
        };
        let res = await fetch("http://127.0.0.1:8000/auth/request-reset-email/", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer token',
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {
               
                if (result) {
                    setError(true)
                    localStorage.setItem("reset_token", result?.token);
                    localStorage.setItem("uidb64", result?.uidb64);
                    localStorage.setItem("email", result?.email);
                } else {
                    alert("tài khoản hoặc mật khẩu sai kìa")
                    //  setError(result?.detail)

                    // history.push("/")

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
            <div className=" ml-40 " id="banner" >
        

                <div id="login" className="border-2 border-gray-900 ">
                    <Link to="/"><img className="h-14 mt-2 ml-5  " src={logo} alt="logo" /></Link>
                    <h2>Reset Password </h2>
                    <p>Please input email next to reset your password .</p>
                    {
                        error  && <div className=" text-base text-green-600 mb-3">{mess}</div>
                    }
                    <div id="form-field">

                        <input type="text" id='form-input' placeholder=" " onChange={e => setEmail(e.target.value)} />
                        <label className='ml-28' id='form-label' >Email</label>
                    </div>
                
                    <input type="submit" className="cursor-pointer" id="log" value="Reset" onClick={Reset} />
                </div>

            </div>



        </div>
    );


}


export default ResetPass

