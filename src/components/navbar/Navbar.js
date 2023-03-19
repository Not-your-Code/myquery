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
            <li >
              About
            </li>
            <li>
              Contact
            </li>
            <li className='login'>
              {
                props.userName ?
                  (
                    <>
                      <li >
                        <button onClick={() => {setClicked(!clicked)}}>
                           <img src={require('./avatar.png')} />
                        </button> 
                      </li>
                      {clicked ? <User user={props.userName} /> : ""}
                    </>
                  )



                  : <Link to="/"> Login</Link>
              }

            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
