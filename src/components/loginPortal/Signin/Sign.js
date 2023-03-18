import React, { useState } from 'react'
import './Sign.css'
import { Link, useNavigate, useHref } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../navbar/Navbar';
export default function Sign() {



  const navi = useNavigate();
  const [ShowPass, setShowPass] = useState("password");
  const [PassState, setPass] = useState("Show");
  const[res , setRes] = useState("")
  const[message , setMessage] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const[IsError , setIsError] = useState(true);
  const [Signed , setSigned] = useState(false);
  //signup fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [passUser, setPassUser] = useState("")
  const [rePass, setRePass] = useState("")
  //validated fields
  const [validName, setValidName] = useState(true)
  const [validEmail, setValidEmail] = useState(true)
  const [validPass, setValidPass] = useState(true)
  const [validRePass, setValidRePass] = useState(true)



  //will work later on
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
    if (validEmail && validName && validPass && validRePass) {
      try {
        await axios.post("http://localhost:8000/signup", { name, email, passUser }).then((res) => {
          console.log(res.data.message)
          // setShouldRedirect(true)
          setRes(true)
          setSigned(true)
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      setShouldRedirect(false)
      setRes(true)
      setMessage("Validation Failed , Try Again !")
      console.log("Validation Failed , Try Again !")
    }

  }



  //return
  return (
    <>
      <div className='main'>
        <nav>
          <Navbar />
        </nav>
        <div className='title'>
          <h1>SignUp Below !</h1>
        </div>
        <div className='form-container'>
          <h2>Signup</h2>
          <span >
            <label>Name </label>
            <input type="text" className='inputs' placeholder='Enter Name' onChange={
              (e) => {
                setName(e.target.value)
                setValidName(
                  /^[a-zA-Z ]{2,30}$/.test(e.target.value)
                );
              }
            }></input>
            <label >
              {!validName && <h6>Should Have Upper and lowerCase and No digits</h6>}
            </label>
          </span>
          <span >
            <label>Email </label>
            <input type="email" className='inputs' placeholder='Enter Email' onChange={
              (e) => {
                setEmail(e.target.value)
                setValidEmail(
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                );
              }
            }></input>
            <label >
              {!validEmail && <h6>enter a valid email </h6>}
            </label>
          </span>
          < span>
            <label>Pass </label>
            <input type={ShowPass} className="inputs" autocomplete="on" placeholder='Enter Password' onChange={
              (e) => {
                setPassUser(e.target.value)
                setValidPass(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)
                );

              }
            }></input>
            {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
            {!validPass && <h6>Must Have One Upper Case , digits with 8 char long</h6>}
          </span>
          < span>
            <label>Re-Enter Pass </label>
            <input type={ShowPass} className="inputs" autoComplete="on" placeholder='Re-Enter Password' onChange={
              (e) => {
                setRePass(e.target.value)
                if (e.target.value === passUser) {
                  setValidRePass(true);
                } else {
                  setValidRePass(false);
                }

              }
            }></input>
            {!validRePass && <h6>Passwords do not match</h6>}
            {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
          </span>
          {/* {shouldRedirect ? (
        <button type='submit' onClick={handleSignUp} className="btn btn1"><Link to="/">Signup</Link></button>
      ) : (
        <button type='submit' onClick={handleSignUp} className="btn btn1"><Link to="/signup">Signup</Link></button>
      )} */}
       <button type='submit' onClick={handleSignUp} className="btn btn1">Signup</button>
         
        </div>
        {/* {isLogged|| error && <div className='message' >
                    <h5>{message}</h5>
                </div>} */}
    {res && <div className='message' >
         {Signed ? (<div>
            Signed UP ! Head to <Link to="/" >Login</Link>?
         </div>):(<h5>{message}</h5>)}
                    
                </div>}
      </div>

    </>

  )
}
