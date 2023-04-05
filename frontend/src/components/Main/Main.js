import React, { useState , useEffect} from 'react'
import Profile from '../myprofile/Profile'
import MainQuestion from '../MainQuestion/MainQuestion'

export default function Main(props) {
 
 
  return (
    <div>
      {
       props.ProfileAccess ? <Profile />: <MainQuestion />
      }
    </div>

  )
}
