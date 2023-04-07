import React from 'react'
import './Message.css'
export default function Message(props) {
    return (
        <div id='messageCont'>
            <p>{props.message}
            </p>
        </div>
    )
}
