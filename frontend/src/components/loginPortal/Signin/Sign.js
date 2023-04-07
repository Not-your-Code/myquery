import React, { useState,useEffect } from 'react'
import './Sign.css'
import { Link, useNavigate, useHref } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../navbar/Navbar';
import Message from '../../MessageToUser/Message';


export default function Sign() {



  const navi = useNavigate();
  const [ShowPass, setShowPass] = useState("password");
  const [PassState, setPass] = useState("Show");
  const[res , setRes] = useState("")


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

//exists
const [ExistName , setExistName] = useState(null);
const [ExistEmail , setExistEmail] = useState(null);
///

const [isError , setIsError] = useState("")
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


  useEffect(()=>{
    setTimeout(()=>{
        setIsError(null)
    }
        
        ,5000)
    },[isError])

    const handleSignUp = async () => {
      if (validEmail && validName && validPass && validRePass) {
        try {
          const response = await axios.post("http://localhost:8000/signup", { name, email, passUser });
          if (response.data.response === "Email Already Exists") {
            setSigned(false);
            setIsError("Retry");
            setExistEmail(response.data.response);
          } else if (response.data.message === "Name Already Exists") {
            setSigned(false);
            setExistName(response.data.message);
          } else if (response.data.response === "ok") {
            setSigned(true);
            setIsError(false);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setIsError("Validation Failed, Try Again!");
      }
    };
    



  //return
  return (
    <>
      <div className='main'>
        <nav>
          <Navbar />
        </nav>
    
        <div className='form-container1'>
        <div className='title'>
                    <h2 >Agent Signup </h2>
                    <p className='sub'>Hey ! Signup Below to proceed</p>
                    </div>

        <form>
          <span >
            <label>Username </label>
            <input type="text" className='inputs' placeholder='Enter Username' onChange={
              (e) => {
                setName(e.target.value)
                setValidName(
                  /^[a-zA-Z ]{2,30}$/.test(e.target.value)
                );
              }
            }></input>
            <label >
            {!validName ? <h6>Should Have Upper and lowerCase and No digits</h6>: ExistName ? <h6>{ExistName}</h6>:""}
              {/* {!validName && <h6>Should Have Upper and lowerCase and No digits</h6>} */}
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
              {/* {!validEmail || ExistEmail && <h6>{ExistEmail}</h6>} */}
              {!validEmail ? <h6>Enter A valid Email</h6>: ExistEmail ? <h6>{ExistEmail}</h6>:""}
            </label>
          </span>
          < span>
            <label>Pass </label>
            <input type={ShowPass} className="inputs" autoComplete='' placeholder='Enter Password' onChange={
              (e) => {
                setPassUser(e.target.value)
                setValidPass(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(e.target.value)
                );

              }
            }></input>
            {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
            {!validPass && <h6>Should have Upper , lower , special and digits with 8 char longs</h6>}
          </span>
          < span>
            <label>Re-Enter Pass </label>
            <input type={ShowPass} className="inputs" autoComplete='' placeholder='Re-Enter Password' onChange={
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
          </form>
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
    {isError &&
         <Message message={isError}/>}
                    
               

                {
                  Signed && <div className='message'>Signed UP ! Head to <Link to="/" >Login</Link>?</div>
                }
      </div>

    </>

  )
}
