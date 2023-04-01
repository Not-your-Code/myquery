import React, { useState , useEffect} from 'react'
import Profile from '../myprofile/Profile'

export default function Main(props) {
 
 
  return (
    <div>
      {
       props.ProfileAccess ? <Profile />: "this is the home"
      }
    </div>

  )
}
