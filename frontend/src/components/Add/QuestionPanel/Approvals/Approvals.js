import React, { useEffect, useState } from 'react'
import Loader from '../../../Loader/Loader'
import axios from 'axios'
import List from './ListQuestion/List'

export default function Approvals() {
    const [loading, setIsLoading] = useState(false)
    const[questionToBeApproved , setQuestionTobeApproved] = useState([])



    const fetchToBeApproved = () => {
        try {
           setIsLoading(true)
            return axios.get('http://localhost:8000/Approve', {}).then((res) => {
                
                setQuestionTobeApproved(res.data.response)
                console.log(res.data.response)
                setIsLoading(false)
            }).catch((e) => {
                console.log(e)
            })
        } catch (e) { }
    }

    useEffect(() => {
        fetchToBeApproved()
    }, [])
    return (
        <div>
            {
                loading ? <Loader />:
                <div>
                    <ul id="approvalsList">
                    {
                     questionToBeApproved.map((question)=>{
                       return (
                        <li>
                          <List Category={question.Category} Question={question.Question} CreatedBy={question.CreatedBy} approve={question.approved}/>
                          </li>
                          )
                     })
                    }
                    </ul>
                </div>
            }
           
        </div>
    )
}
