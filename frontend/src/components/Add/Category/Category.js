import React, { useState } from 'react'
import axios from 'axios'
import './Add.css'
export default function Category() {
  const [cat, setCat] = useState()
  const [message, setMessage] = useState("")
  const [isMessage, setIsMessage] = useState(false)





  async function handleSubmit() {

    try {

      axios.post("http://localhost:8000/add", {
        name: cat
      }).then((res) => {
        setMessage(res.data.response)
        setCat("")
        setIsMessage(true)
      }).catch((res) => {
        setMessage(res.data.response)

      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='AddCont'>
      <div>
        <h3>Add Category</h3>
      </div>
      <form>
        <span>
          <label>Category Name</label>
          <input type="text" placeholder='enter name' value={cat} onChange={(e) => {
            setCat(e.target.value)
          }}></input>
          <label>
            {/* {isError?"error":""} */}
          </label>
        </span>
        <button type="button" onClick={handleSubmit} className="btn">Add</button>
      </form>
      <div className='message1'>
        {isMessage ? message : ""}
      </div>
    </div>

  )
}
