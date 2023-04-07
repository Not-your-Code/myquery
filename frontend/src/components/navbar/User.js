import React, { useRef, useEffect } from "react";
import './User.css'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

export default function User(props) {
    let role = Cookies.get('Role')
    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        // add event listener to handle clicks outside the component
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // remove event listener when component unmounts
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleClickOutside = (event) => {
        // check if clicked outside the component
        if (ref.current && !ref.current.contains(event.target)) {
          props.setClickedPro(false);
        }
      };

    return (
        <div className='userProfile' ref={ref}>
            <div className='user'>
           
                <h3>{props.user.charAt(0).toUpperCase()+props.user.slice(1) }</h3>
                <span className='role'>{role}</span>
           
                </div><div className='menu'>
                 <ul className='userlist'>
                    <li>
                        <img src={require('./assets/icons/user.png')} className="logoUser"/><Link  to="/profile"  className='userLink'>My profile</Link>
                    </li>
                    {/* they are all fine just changing how the profile is accessed */}
                    <li>
                        <img src={require('./assets/icons/question.png')}className="logoUser" /><Link to="/home" className='userLink'>Go To Home</Link>
                    </li> 
                    <li>
                        <img src={require('./assets/icons/log-out.png')} className="logoUser"/><Link to='/'  className='userLink' onClick={()=>{
                            Cookies.remove('sessionId')
                            Cookies.remove('user')
                            window.location.reload()
                            navigate('/')
                       
                        }}>Logout</Link>
                    </li>
                 </ul>
                 </div>
        </div>
    )
}
  {/* <ul>
                    <li>{props.user}</li>
                </ul>
                <div className='logout'>
                    <h5 onClick={()=>{
                       window.location.reload()
                    }}>Logout</h5>
                </div> */}