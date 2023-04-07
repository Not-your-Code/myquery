import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import User from './User';
import Cookies from 'js-cookie';


export default function Navbar(props) {
  const [clickedPro, setClickedPro] = useState(false)
  let user = Cookies.get('user')


  return (
    <div className='nav'>
      <nav>
        <div className='rightNav'>
          <h2>QueryHere</h2>
        </div>
        <div className='LeftNav'>
          <ul className='items'>
            <li className='login'>
              {/* if user is present it will show the profile icon or login / signup button  */}
            {
              user ? 
                <>
                    <button className="userPro" onClick={() => { setClickedPro(!clickedPro) }}>
                      <img src={require('./avatar.png')} />
                    </button>
                    {clickedPro ? <User user={user} setClickedPro={setClickedPro}/> : ""}
                </>
                  :
                   <div>
                      < button className="navbar-btn" ><Link style={{ color: "black" }} to="/login"> Login</Link></button>
                      <button className="navbar-btn" ><Link style={{ color: "black", filter: "drop-shadow(5px 5px 10px #000)" }} to="/signup" >Signup</Link></button>
                   </div>
            }
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
