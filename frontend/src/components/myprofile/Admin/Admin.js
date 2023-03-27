import React, {useState} from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';

export default function Admin() {

    const [key , setKey]  = useState("")
    const [pass , setPass] = useState("")
    const [ message , setMessage]= useState("")
  const handelSubmit = ()=>{
   if(key === "XyQ393"){
  setMessage("done")
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
                       <input type="text" placeholder='Enter Username' onChange={
                           (e) => {
                               setKey(e.target.value)
                           }
                       }></input>
                   </span>
                   <span>
                       
                       <label>Password </label>
                       <input type="text" placeholder='Enter Username' onChange={
                           (e) => {
                               setPass(e.target.value)
                           }
                       }></input>
                   </span>
                   <button type="submit" onSubmit={handelSubmit} className="btn"><Link to="">Signup</Link></button>
            </form>
            {message}
        </div>
    </div>
  )
}
