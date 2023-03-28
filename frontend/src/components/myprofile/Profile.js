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
    setAdminClick(!AdminClick)
    
  
  }
 const handleAprovalClick = ()=>{
  setHandleDetail(false)
  setAdminClick(false)
  setQuestionClick(false)
  setApproval(!approval)
 
 }
 const handelQuestionClick = ()=>{
  setHandleDetail(false)
  setAdminClick(false)
  setApproval(false)
  setQuestionClick(!QuestionClick)
 
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
         
            <li className="listPro" onClick={handelDetailClick}>
            Details
            </li>
            <li className="listPro" onClick={handelQuestionClick}>
            Add Question
            </li>
            {
              isAdmin ? 
              <li className='listPro' onClick={handleAprovalClick}>
                Approvals
              </li>
              
              :  <li className="listPro" onClick={handleAdminClick} >
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
          QuestionClick ? <div>Add Question</div>:""
        }
      {
       isAdmin||AdminClick ? "":<Admin setIsAdmin={setIsAdmin}/> 
      }
      {
        approval ? <div>approvlas</div> :""
      }

      </div>

    </div>
  )
}
