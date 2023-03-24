import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import User from './User';

export default function Navbar(props) {
  const [clicked, setClicked] = useState(false)
  return (
    <div className='nav'>
      <nav>
        <div className='rightNav'>


          <h2>My Query</h2>
        </div>
        <div className='LeftNav'>
          <ul className='items'>
          
            <li className='login  '>
              {
                props.userName ?
                  (
                    <>
                      <li >
                        <button  className="userPro" onClick={() => {setClicked(!clicked)}}>
                           <img src={require('./avatar.png')} />
                        </button> 
                      </li>
                      {clicked ? <User user={props.userName} setProfile={props.setProfile} profile={props.profile}/> : ""}
                    </>
                  )



                  :  <button className="navbar-btn" ><Link to="/"> Login</Link></button>
              }

            </li>
            <li >
            {
                props.userName ?
                 ""


                  :   <button className="navbar-btn" ><Link to="/signup" >Signup</Link></button>
              }
             
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
