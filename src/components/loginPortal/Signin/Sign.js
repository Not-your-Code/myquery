import React, { useState } from 'react'
import './Sign.css'
import { Link ,useNavigate , useHref} from 'react-router-dom';
import axios from 'axios'
export default function Sign() {



  const navi = useNavigate();
  const [ShowPass, setShowPass] = useState("password");
  const [PassState, setPass] = useState("Show");
  const[name , setName] = useState("")
  const[email , setEmail] = useState("")
  const[passUser , setPassUser] = useState("")
  const[mes , setMes] = useState({})

  const handlePass = () => {
    if (ShowPass === "text") {
      setShowPass("password")
      setPass("Show")

    } else {
      setShowPass("text")
      setPass("Hide")

    }


  }


  const handleSubmit = async (  ) => {

    

    try{

        await axios.post("http://localhost:8000/signup" , {
          name , email, passUser
        }).then((res)=>{
          console.log(res)

        })
    

    }catch(e){
      console.log(e)

    }

  
  }
  return (
    <div className='container'>
  
      <h1>My <span>Query</span></h1>
      <div className='welcome'>
        <h2>Greetings , Signup Below</h2>
      </div>
      <div className='form-container'>
        <div className='left'>
          hey
        </div>
        <div className='right'>
          <h2>Signup</h2>
         <form>
          <span id='inputs'>
              <label>Name </label>
              <input type="text" className='inputs' placeholder='Enter Name' onChange={
                (e)=>{
                  setName(e.target.value)
                }
              }></input>
            </span>
            <span id='inputs'>
              <label>Email </label>
              <input type="email" className='inputs' placeholder='Enter Email' onChange={
                (e)=>{
                  setEmail(e.target.value)
                }
              }></input>
            </span>
            < span id='inputs'>
              <label>Pass </label>
              <input type={ShowPass} className="inputs"  autocomplete="on" placeholder='Enter Password' onChange={
                (e)=>{
                  setPassUser(e.target.value)
                }
              }></input>
              <button type='button' onClick={handlePass} className="show">{PassState}</button>
            </span>
          
            <button type='submit' onClick={handleSubmit} className="btn btn1"><Link to="/">Signup</Link></button>
            </form>
       

        </div>

      </div>

    </div>
  )
}
