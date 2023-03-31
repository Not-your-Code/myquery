import React, { useState , useEffect} from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';


export default function Login(props) {
    const [ShowPass, setShowPass] = useState("password");
    const [PassState, setPass] = useState("Show");
    const [message, setMessage] = useState('');
    const [name, setName] = useState("")
    const [passUser, setPassUser] = useState("")
    const [res , setRes] = useState("")
    const [session , setSession] = useState(null)
  
    const handlePass = () => {
        if (ShowPass === "text") {
            setShowPass("password")
            setPass("Show")
        } else {
            setShowPass("text")
            setPass("Hide")
        }
    }


   const  setisLoggedIn=()=>{
      

       if(Cookies.get('sessionId') != null){
       
       props.setLoggedIn(true)
      props.setUser(Cookies.get('user'));
       }
       
    }

useEffect(()=>{
    setisLoggedIn();
}, [])

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8000/login', {
                name, passUser
            }).then((res) => {
                if (res.data.success) {
                   
                  
                    Cookies.set('sessionId' , res.data.sessionId , {expires:100})
                    Cookies.set('user' , name , {expires:100})
                    Cookies.set('username' , name , {expires:100})
                     Cookies.set('Role' , res.data.role , {expires:100})
                   setisLoggedIn();
              
                //   console.log(res.data.sessionId)
              
                 
                } else  {
                  
                    setMessage("Incorrect Username Or Password");
                    setRes(true)
                    // console.log(res.data.success)
                   
                 
                
                }

            })
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <>
          
                <div className='form-container'>
                    <div className='title'>
                    <h2 >Agent Login </h2>
                    <p className='sub'>Hey ! Login Below to proceed</p>
                    </div>
                    <form>
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
                        <input type={ShowPass} autoComplete="" placeholder='Enter Password' onChange={
                            (e) => {
                                setPassUser(e.target.value)
                            }
                        }></input>
                    </span>
                    </form>
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
