import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import './Q.css'

export default function QuestionAdd(props) {
  let Categories = props.cats

  const firstCategory = Categories[0];
  const defaultSelectedCategoryName = firstCategory.Cat_name


  const user = Cookies.get('username')
  let role = Cookies.get('Role')
  let approved = Boolean
  if (role === "Admin") {
    approved = true;
  } else {
    approved = false;
  }
  const [selectedCat, SetSelectedCat] = useState(defaultSelectedCategoryName)
  const [question, setQuestion] = useState("")
  const [message, setMessage] = useState("")

  //validation 

  const [validQuestion, setValidQuestion] = useState(true)


  const handleSelect = (e) => {
    SetSelectedCat(e.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (validQuestion && question && user&&selectedCat) {


        axios.post('http://localhost:8000/addQuestion', {
          question, user, approved, selectedCat
        }).then((res) => {
          setMessage(res.data.message)
          setQuestion("")
        })
      } else {
        setMessage("VALIDATION FAILED")
        setQuestion("")
      }


    } catch (e) { }
    // console.log(e.target.value)
  }
  const optionItems = Categories.map((category) => (
    <option key={category._id} value={category.Cat_name}   >
      {category.Cat_name}
    </option>
  ));

  return (
    <div className='QuestionCont'>
      <form onSubmit={handleSubmit} id='formQuestion'>
      
        <label>Add Your Question</label>
        <select onChange={handleSelect}>{optionItems}</select>
        <span id='question'>
       
         
        <textarea placeholder='Type Your Question Here' value={question} onChange={(e) => {
          setQuestion(e.target.value)
          setValidQuestion(
            /^.{5,300}$/.test(e.target.value)
          )
        }}></textarea>
        <label>
          {!validQuestion ? <h6>Should be between 5-300 char  </h6> : ""}
        </label>
        </span>
        <button type='submit' className='btn1'>Add Question</button>
      </form>
      <div>
        {message}
      </div>
      
      
      <div className='AddCat'><button className="addCat" onClick={()=>{
    props.setAddCat(true) 
  }}>Add Category ?</button>
   
   </div>
    </div>
  );
}
