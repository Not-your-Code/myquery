import React, { useState , useEffect} from 'react'

export default function Main() {
  const [counter , setCounter] = useState(0)
  return (
    <div>{counter}
    <button onClick={()=>{
      setCounter(counter+1)
    }}>+</button>
    </div>

  )
}
