import React, {useEffect , useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';


export default function QuestionAdd(props) {
    let Categories = props.cats

    const firstCategory = Categories[0];
    const defaultSelectedCategoryName = firstCategory.Cat_name


    const user = Cookies.get('username')
    let role = Cookies.get('Role')
    let approved = Boolean
    if(role ==="Admin"){
        approved= true;
    }else{
        approved=false;
    }
    const[selectedCat , SetSelectedCat] = useState(defaultSelectedCategoryName)
    const [question , setQuestion] = useState("")
   const [message , setMessage] = useState("")

//validation 

const[validQuestion , setValidQuestion] = useState(true)


const handleSelect = (e) =>{
   SetSelectedCat(e.target.value)
}
const handleClick = (event)=>{
    event.preventDefault();

    try{
if(validQuestion){
  

    axios.post('http://localhost:8000/addQuestion' , {
    question , user , approved , selectedCat 
}).then((res)=>{
    console.log(res)
})
}else{
    setMessage("VALIDATION FAILED")
}
     

    }catch(e){}
    // console.log(e.target.value)
}
const optionItems = Categories.map((category) => (
    <option key={category._id} value={category.Cat_name}   >
      {category.Cat_name}
    </option>
  ));

  return (
    <div>
        <form onSubmit={handleClick}>
      <select onChange={handleSelect}>{optionItems}</select>
       <input type='text' onChange={(e)=>{
             setQuestion(e.target.value)
             setValidQuestion(
                /^.{5,300}$/.test(e.target.value)
             )
       }}></input>
       <label>
        {!validQuestion ?<h6>Should be between 5-300char and have atleast one UpperCase</h6>:""}
       </label>
       <button type='submit'  className='btn'>Add</button>
      </form>
      <div>
        {message}
      </div>
    </div>
  );
}
