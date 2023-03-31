import React from 'react'
import './CatNA.css'
export default function 
(props) {
  return (
    <div className='CatNaCont'>
      <div>
  <img id="Cat"src={require('E:/development/react/myquery/frontend/src/components/assests/404.png')} />
  
  </div>
  <span>No Category added ! </span>
  <div><button className="btn" onClick={()=>{
    props.setAddCat(true) 
  }}>Add one ?</button>
   
   </div> </div>
  )
}
