import React, { useState, useEffect , useRef } from 'react'
import './Login.css'
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Message from '../../MessageToUser/Message';
import Navbar from '../../navbar/Navbar';
import Loader from '../../Loader/Loader';



export default function Login(props) {
    
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const loginRef = useRef(null)
    const navigate = useNavigate();
    const [ShowPass, setShowPass] = useState("password");
    const [PassState, setPass] = useState("Show");

    const [name, setName] = useState("")
    const [passUser, setPassUser] = useState("")
    const [res, setRes] = useState("")
    let sessionId = Cookies.get('sessionId')
     
   const [isLoading , setisLoading] = useState(false)

    const handleKeyPress= (event , inputRef)=>{
        if(event.key === 'Enter'){
            inputRef.current.focus();
        }
    }
    const handleLoginPress = (event)=>{
        if(event.key === 'Enter'){
            handleLogin();
        }
    }
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
        setisLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
       
        try {
            await axios.post('http://localhost:8000/login', {
                name, passUser
            }).then((res) => {
                if (res.data.success) {
                    Cookies.set('sessionId', res.data.sessionId, { expires: 100 })
                    Cookies.set('user', name, { expires: 100 })
                    Cookies.set('Role', res.data.role, { expires: 100 })
                    navigate('/home')
                    setisLoggedIn();
                    setisLoading(false)
                    window.location.reload()
                    
                    

                } else {
                    setRes("Incorrect Username Or Password")
                    setName("")
                    setPassUser("")
                    setisLoading(false)
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
                        <input value={name} ref={emailRef}type="text" placeholder='Enter Username' 
                        onChange={(e) => {
                                setName(e.target.value)
                            }}
                        onKeyDown={(event)=>handleKeyPress(event , passRef)}
                            ></input>
                    </span>
                    <span>
                        <label>Pass </label>
                        <input type={ShowPass} value={passUser}ref={passRef} autoComplete="" placeholder='Enter Password' onChange={
                            (e) => {
                                setPassUser(e.target.value)
                            }
                        }
                        
                        onKeyDown={(event)=>handleKeyPress(event , loginRef)}
                        ></input>
                    </span>
                </form>
                {/* <button type='button' onClick={handlePass} className="show">{PassState}</button> */}
                <button ref={loginRef} type='submit' onClick={handleLogin} className="btn" 
                onKeyDown={(event)=>handleLoginPress(event)}
                >Login</button>
                <div className='bottom'>
                    <h5>Dont have a account ?<Link to="/signup" > Signup</Link></h5>
                </div>
            </div>
            {res &&
                <Message message={res} />
            }
            {
                isLoading && <div id='loader'><Loader/></div>
            }

</div>
       
    )
}
