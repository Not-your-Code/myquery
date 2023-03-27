import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Admin from './Admin/Admin'
import './Profile.css'

export default function Profile() {

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [passUser, setPassUser] = useState("")
  const [rePass, setRePass] = useState(1)

const[option , setOption] = useState(false)

  const setDetails = (res) => {
    setName(res.data.name)
    setRole(res.data.designation)
    setEmail(res.data.email)
    setPassUser(res.data.password)


  }

  const handleAdminClick = ()=>{
    setOption(!option)
  
  }
  const handleProfile = async () => {

    try {
      let name = Cookies.get('user')
      const data = await axios.post("http://localhost:8000/profile", {
        name
      }).then((res) => {
        setDetails(res)
      })
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    handleProfile()
  })


  let profileList = ["Details", "Add Question", "Become Admin"]
  return (
    <div className='profileCont'>
      <div id='proLeft'>
        <div id='userInfo'>
          <img src={require('../navbar/avatar.png')} />
          <div id='info'>
            <span>{name}</span>
            <span id='role'>{role}</span>
          </div>
        </div>
        <ul id='optList'>
         
            <li className="listPro">
            Details
            </li>
            <li className="listPro">
            Add Question
            </li>
            <li className="listPro" onClick={handleAdminClick} >
            Become Admin 
            </li>
          
        </ul>
        <div id="logout">
          <Link to="/" className='userLink' style={{ color: "blue" }} onClick={() => {
            Cookies.remove('sessionId')
            Cookies.remove('user')
            window.location.reload()
          }}>Logout</Link>
        </div>

      </div>
      <div id='proRight'>
      {
       option ? "":<Admin/> 
      }

      </div>

    </div>
  )
}
