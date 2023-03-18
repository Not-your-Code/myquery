import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';

import axios from 'axios';


export default function Login(props) {
    const [ShowPass, setShowPass] = useState("password");
    const [PassState, setPass] = useState("Show");
    const [message, setMessage] = useState('');
    const [name, setName] = useState("")
    const [passUser, setPassUser] = useState("")
    const [res , setRes] = useState("")

  
    const handlePass = () => {
        if (ShowPass === "text") {
            setShowPass("password")
            setPass("Show")
        } else {
            setShowPass("text")
            setPass("Hide")
        }
    }


    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8000/login', {
                name, passUser
            }).then((res) => {
                if (res.data.message === "Incorrect Details") {
                    setMessage(res.data.message);
                    setRes(true)
                    console.log(res.data.message)

                } else if (res.data.message === "logged in") {
                    setMessage(res.data.message);
                    setRes(true)
                    props.setUser(name);
                    props.setLoggedIn(true)
                    console.log(res.data.message)
                }

            })
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <>
          
                <div className='form-container'>
                    <h2>Login</h2>
                    <span>
                        <label>Username </label>
                        <input type="text" placeholder='Enter Username' onChange={
                            (e) => {
                                setName(e.target.value)
                            }
                        }></input>
                    </span>
                    <span>
                        <label>Pass </label>
                        <input type={ShowPass} placeholder='Enter Password' onChange={
                            (e) => {
                                setPassUser(e.target.value)
                            }
                        }></input>
                    </span>
                    {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
                    <button type='submit' onClick={handleLogin} className="btn">Login</button>
                    <div className='bottom'>
                        <h5>Dont have a account ?<Link to="/signup" > Signup</Link></h5>
                    </div>
                </div>
                {res && <div className='message' >
                    <h5>{message}</h5>
                </div>}
           

        </>
    )
}
