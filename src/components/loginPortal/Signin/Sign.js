import React, { useState } from 'react'
import './Sign.css'
import { Link, useNavigate, useHref } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../navbar/Navbar';
export default function Sign() {



  const navi = useNavigate();
  const [ShowPass, setShowPass] = useState("password");
  const [PassState, setPass] = useState("Show");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [passUser, setPassUser] = useState("")

  const [rePass, setRePass] = useState("")

  const handlePass = () => {
    if (ShowPass === "text") {
      setShowPass("password")
      setPass("Show")

    } else {
      setShowPass("text")
      setPass("Hide")

    }


  }


  const handleSignUp = async () => {
    try {

      await axios.post("http://localhost:8000/signup", {
        name, email, passUser
      }).then((res) => {
        console.log(res.data.message)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (

    <>
      <div className='main'>
        <nav>
          <Navbar />
        </nav>
        <div className='title'>
          <h1>Welcome!</h1>
        </div>

        <div className='form-container'>


          <h2>Signup</h2>

          <span >
            <label>Name </label>
            <input type="text" className='inputs' placeholder='Enter Name' onChange={
              (e) => {
                setName(e.target.value)
              }
            }></input>
          </span>
          <span >
            <label>Email </label>
            <input type="email" className='inputs' placeholder='Enter Email' onChange={
              (e) => {
                setEmail(e.target.value)
              }
            }></input>
          </span>
          < span>
            <label>Pass </label>
            <input type={ShowPass} className="inputs" autocomplete="on" placeholder='Enter Password' onChange={
              (e) => {
                setPassUser(e.target.value)
              }
            }></input>
            {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
          </span>
          < span>
            <label>Re-Enter Pass </label>
            <input type={ShowPass} className="inputs" autoComplete="on" placeholder='Re-Enter Password' onChange={
              (e) => {
                setRePass(e.target.value)
              }
            }></input>
            {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
          </span>

          <button type='submit' onClick={handleSignUp} className="btn btn1"><Link to="/">Signup</Link></button>



        </div>
      </div>

    </>

  )
}
