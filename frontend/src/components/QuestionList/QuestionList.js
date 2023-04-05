import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash , faCheck, faClipboard, faCopy } from '@fortawesome/free-solid-svg-icons'
export default function QuestionList(props) {
  const[copied , setIsCopied] = useState(false)
  function handleClick(){
    const textToCopy  = props.Question
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
    
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
  }
  return (
    <div className='ListCont'>
    <div id='rightList'>
      <span className="list">
        <label className="listLabeel">Category :</label>
        <h5>{props.Category}</h5>
      </span>
      <span className="list">
        <label className="listLabeel">Question :</label>
        <h5>{props.Question}</h5>
      </span>
  
    </div>

    <div id='leftList2'>
         <div>  {
            copied ? <label id='copied'>Copied</label> :""
           }
           </div>
          <button onClick={handleClick} id='copyBtn'><FontAwesomeIcon icon={faCopy} /></button>
         
    </div>
  </div>
  )
}
