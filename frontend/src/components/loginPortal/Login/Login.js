import React, { useState, useEffect } from 'react'
import './Login.css'
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Message from '../../MessageToUser/Message';
import Navbar from '../../navbar/Navbar';



export default function Login(props) {

    const navigate = useNavigate();
    const [ShowPass, setShowPass] = useState("password");
    const [PassState, setPass] = useState("Show");

    const [name, setName] = useState("")
    const [passUser, setPassUser] = useState("")
    const [res, setRes] = useState("")
    let sessionId 

    const handlePass = () => {
        if (ShowPass === "text") {
            setShowPass("password")
            setPass("Show")
        } else {
            setShowPass("text")
            setPass("Hide")
        }
    }


    const setisLoggedIn = () => {
        if (sessionId != null) {
            console.log(sessionId)
            props.setLoggedIn(true)
            props.setUser(Cookies.get('user'));
           
          
        
        }

    }

    //useeffect to set the message visibility gone after two seconds

    useEffect(() => {
        setTimeout(() => {
            setRes(false)
        }
            , 5000)
    }, [res])

    // useEffect(() => {
    //     setisLoggedIn();
    // }, [])

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8000/login', {
                name, passUser
            }).then((res) => {
                if (res.data.success) {
                    Cookies.set('sessionId', res.data.sessionId, { expires: 100 })
                    Cookies.set('user', name, { expires: 100 })
                    Cookies.set('Role', res.data.role, { expires: 100 })
                    navigate('/home')
                    window.location.reload()
                    setisLoggedIn();

                } else {
                    setRes("Incorrect Username Or Password")
                }

            })
        } catch (e) {
            console.log(e)
        }
    }

    return (

   
      <div className='main'>
        <nav>
          <Navbar />
        </nav>
    
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
            {res &&
                <Message message={res} />
            }

</div>
       
    )
}
