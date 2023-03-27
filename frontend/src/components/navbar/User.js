import React from 'react'
import './User.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
export default function User(props) {
    return (
        <div className='userProfile'>
            <div className='user'>
           
                <h3>{props.user.charAt(0).toUpperCase()+props.user.slice(1) }</h3>
                <span className='role'>User</span>
           
                </div><div className='menu'>
                 <ul className='userlist'>
                    <li>
                        <img src={require('./assets/icons/user.png')} className="logoUser"/><Link  to="/"  onClick={()=> props.setProfile(!props.profile)}className='userLink'>My profile</Link>
                    </li>
                    <li>
                        <img src={require('./assets/icons/question.png')}className="logoUser" /><Link to="/" className='userLink'>Add a Question</Link>
                    </li> 
                    <li>
                        <img src={require('./assets/icons/log-out.png')} className="logoUser"/><Link to="/" className='userLink' onClick={()=>{
                            Cookies.remove('sessionId')
                            Cookies.remove('user')
                            window.location.reload()
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