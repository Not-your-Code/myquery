import React from 'react'
import './User.css'
export default function User(props) {
    return (
        <div className='userProfile'>
            <div className='profile'>
                <ul>
                    <li>{props.user}</li>
                </ul>
                <div className='logout'>
                    <h5 onClick={()=>{
                       window.location.reload()
                    }}>Logout</h5>
                </div>
            </div>

        </div>
    )
}
