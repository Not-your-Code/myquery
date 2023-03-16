import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
export default function Login() {




    const [ShowPass, setShowPass] = useState("password");
    const [PassState, setPass] = useState("Show");

    const handlePass = () => {
        if (ShowPass === "text") {
            setShowPass("password")
            setPass("Show")

        } else {
            setShowPass("text")
            setPass("Hide")

        }


    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <div className='container'>
            <h1>My <span>Query</span></h1>
            <div className='welcome'>
                <h2>Greetings , Login Below</h2>
            </div>
            <div className='form-container'>
                <div className='left'>
                    hey
                </div>
                <div className='right'>
                    <h2>Login</h2>
                    <form action='POST'>
                    < span id='inputs'>
                    <label>Email </label>
                        <input type="email" className='inputs' placeholder='Enter Email'></input>
                        </span>
                        < span id='inputs'>
                        <label>Pass </label>
                            <input type={ShowPass} className="inputs"   autoComplete="on"  placeholder='Enter Password'></input>
                            <button type='button' onClick={handlePass} className="show">{PassState}</button>
                        </span>
                        <button type='submit' onSubmit={handleSubmit} className="btn">Login</button>
                      
                    </form>
                       <span className='OR'>OR</span>
                        <button  className="btn"><Link style={{ textDecoration: 'none' , color:"white"}} to="/signup">Signup</Link></button>
                </div>

            </div>
           
        </div>
    )
}
