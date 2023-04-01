import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddQuestion from '../Add/QuestionPanel/AddQuestion'
import Admin from './Admin/Admin'
import './Profile.css'
import Approvals from '../Add/QuestionPanel/Approvals/Approvals'

export default function Profile() {

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [passUser, setPassUser] = useState("")
  const [rePass, setRePass] = useState(1)

 
  const [isAdmin , setIsAdmin] =useState("")


const [approval , setApproval] = useState(false)
const[AdminClick , setAdminClick] = useState(false)
const [QuestionClick , setQuestionClick] = useState(false)
const [detail , setHandleDetail ] = useState(true)
  const setDetails = (res) => {
    setName(res.data.name)
    setRole(res.data.Role)
    setEmail(res.data.email)
    setPassUser(res.data.password)
  }
//handleing the content of profiles 
  const handleAdminClick = ()=>{
    setHandleDetail(false)
    setApproval(false)
    setQuestionClick(false)
    setAdminClick(true)
    
  
  }
 const handleAprovalClick = ()=>{
  setHandleDetail(false)
  setAdminClick(false)
  setQuestionClick(false)
  setApproval(true)
 
 }
 const handelQuestionClick = ()=>{
  setHandleDetail(false)
  setAdminClick(false)
  setApproval(false)
  setQuestionClick(true)
 
 }

 const handelDetailClick = ()=>{
  setAdminClick(false)
  setApproval(false)
  setQuestionClick(false)
   setHandleDetail(true)

 }

 //handleing the content of profiles *//


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


  const checkIsAdmin = ()=>{
    let check = Cookies.get('Role')
    if(check ==="Admin"){
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
  }
  useEffect(() => {
    handleProfile()
    checkIsAdmin()
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
         
            <li key="1" className="listPro" onClick={handelDetailClick}>
            Details
            </li>
            <li key="3" className="listPro" onClick={handelQuestionClick}>
            Add Question
            </li>
            {
              isAdmin ? 
              <li key="4" className='listPro' onClick={handleAprovalClick}>
                Approvals
              </li>
              
              :  <li  key="5" className="listPro" onClick={handleAdminClick} >
              Become Admin 
              </li>
            }
          
          
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
          detail ? <div>details</div> :""
        }
        {
          QuestionClick ? <div><AddQuestion/></div>:""
        }
      {
       isAdmin ? "":(
        AdminClick ? <Admin setIsAdmin={setIsAdmin}/>  :""
       )
      }
      {
        approval ? <div><Approvals/></div> :""
      }

      </div>

    </div>
  )
}
