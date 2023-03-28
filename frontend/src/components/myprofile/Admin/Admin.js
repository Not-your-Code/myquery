import React, { useState } from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'
export default function Admin(props) {

    const [key, setKey] = useState("")
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState("")



    let AdminKey = "HEHE"
 
    let user = Cookies.get('user')
 


    const handelSubmit = async () => {

        if(key === AdminKey){
           axios.post("http://localhost:8000/BecomeAdmin",{
             user , pass
           }) .then((res)=>{
            if(res.data.message === "success"){
                   console.log(res)
                   Cookies.set('Role' , res.data.role , {expires:100})
                   props.setIsAdmin(true)
            }else if(res.data.message === "password Incorrect")
               setMessage("Password Incorrect")

           }) 
        }else{
            setMessage("Admin Key Incorrect")
        }



    }

    return (
        <div className='AdminCont'>
            <div id='messageAdmin'>
                Admin Signup
            </div>
            <div className='AdminForm'>
                <form>
                    <span>
                        <label>Admin Key </label>
                        <input className="AdminInput" type="text" placeholder='Enter Key' onChange={
                            (e) => {
                                setKey(e.target.value)
                            }
                        }></input>
                    </span>
                    <span>

                        <label>Password </label>
                        <input type="password" className="AdminInput" placeholder='Your Password' onChange={
                            (e) => {
                                setPass(e.target.value)
                            }
                        }></input>
                    </span>
                    <button type="button" onClick={handelSubmit} className="btn">Signup</button>
                </form>
                {message}
            </div>
        </div>
    )
}
