import React from 'react'

export default function List(props) {
  return (
    <div className='cont'>
       <div id='rightList'>
       <span className="list">
        <label className="listLabeel">Category</label>
        <h5>{props.Category}</h5>
       </span>
       <span className="list">
        <label className="listLabeel">Question</label>
        <h5>{props.Question}</h5>
       </span>
       <span className="list">
        <label className="listLabeel">CreatedBy</label>
        <h5>{props.CreatedBy}</h5>
       </span>
       </div>
     
       <div id='leftList'>
       </div>
    </div>
  )
}
