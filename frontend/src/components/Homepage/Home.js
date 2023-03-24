import React,{useState} from 'react'
import './Home.css'
import Login from '../loginPortal/Login/Login'

import Navbar from '../navbar/Navbar'
import Main from '../Main/Main'
export default function Home() {
  const[loggedIn , setLoggedIn] = useState(false)
  const [User , setUser] = useState(null)
  const[accessProfile ,setProfile]  = useState(false)
  
  return (
    <div className='main'>
      <nav>
        <Navbar userName={User} setProfile={setProfile} profile={accessProfile}/>
      </nav>
      
     <div>
      {loggedIn ? 
      <Main ProfileAccess = {accessProfile} /> :
      (   <><div>
              <Login setLoggedIn={setLoggedIn} setUser={setUser} />
            </div></>
      )
      }
      
     </div>
   
  
    </div>
  )
}
