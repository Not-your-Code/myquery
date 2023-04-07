import React,{useState , useEffect } from 'react'
import './Home.css'
import Login from '../loginPortal/Login/Login'
import Navbar from '../navbar/Navbar'
import Main from '../Main/Main'
import Cookies from 'js-cookie'


export default function Home() {

  const[loggedIn , setLoggedIn] = useState(false)
  const [User , setUser] = useState(null)
 
  let sessionId = Cookies.get('sessionId')

  const setIsloggedIn=  ()=>{
    if(sessionId != null){
      setLoggedIn(true)
    }
  }

  useEffect(()=>{ 
    setIsloggedIn();
  },[])
  return (

      
     <div>
      {loggedIn ? <Main /> : <Login setLoggedIn={setIsloggedIn} setUser={setUser} />
      }
      
     </div>
   
  
 
  )
}
