import React,{useState} from 'react'
import './Home.css'
import Login from '../loginPortal/Login/Login'
import Sign from '../loginPortal/Signin/Sign'
import Navbar from '../navbar/Navbar'

export default function Home() {
  const[signUp , SetSignup] = useState(true)
  
  return (
    <div className='main'>
      <nav>
        <Navbar/>
      </nav>
     <div className='title'>
      <h1>Welcome!</h1>
     </div>
   
  
    </div>
  )
}
