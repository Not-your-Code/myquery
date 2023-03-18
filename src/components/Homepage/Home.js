import React,{useState} from 'react'
import './Home.css'
import Login from '../loginPortal/Login/Login'

import Navbar from '../navbar/Navbar'
import Main from '../Main/Main'
export default function Home() {
  const[loggedIn , setLoggedIn] = useState(false)
  const [User , setUser] = useState(null)
  
  return (
    <div className='main'>
      <nav>
        <Navbar userName={User} />
      </nav>
      
     <div>
      {loggedIn ? 
      <Main /> :
      (   <><div className='title'>
            <h1>Login Below !</h1>
          </div><div>
              <Login setLoggedIn={setLoggedIn} setUser={setUser}/>
            </div></>
        
      )
      }
      
     </div>
   
  
    </div>
  )
}
