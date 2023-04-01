import React from 'react'
import './List.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash , faCheck } from '@fortawesome/free-solid-svg-icons'

export default function List(props) {

  const handleDelete  = ()=>{
    // props.setIsDeleteId(props.id)
    props.delete(props.Question , props.Category)
    // props.setQuestion(props.Question)
    // props.setQuestionCat(props.Category)
  }
  const handleApprove  = async()=>{
    props.approved(props.Question , props.Category)
      // props.setApp(props.Question)
      // props.setAppCat(props.Category)
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
        <span className="list">
          <label className="listLabeel">CreatedBy :</label>
          <h5>{props.CreatedBy}</h5>
        </span>
      </div>

      <div id='leftList'>
        <button className='Listbtn' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
        <button className='Listbtn' onClick={handleApprove}><FontAwesomeIcon icon={faCheck} /></button>
      </div>
    </div>
  )
}
