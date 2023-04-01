import React, { useEffect, useState } from 'react'
import Loader from '../../../Loader/Loader'
import axios from 'axios'
import List from './ListQuestion/List'

import './Approvals.css'
import CatNa from '../CatNA/CatNa'
export default function Approvals() {
    const [loading, setIsLoading] = useState(false)
    const[questionToBeApproved , setQuestionTobeApproved] = useState([])
    const [isData , setIsData] = useState(true) 


    // const[deleteQuestion , setQuestion] = useState(null)
    // const[deleteCat , setQuestionCat] = useState(null)


    // const[AppQuestion , setAppQuestion] = useState(null)
    // const[AppCat , setAppQuestionCat] = useState(null)
    const[isDataChanged , setIsDataChanged ] = useState(false)
    const [isDeleted , setIsdelete] = useState(0)
    const [isApp , setIsApp] = useState(0)
//--------------------------------------------------------------
   const deleteApproval = async(deleteQuestion , deleteCat)=>{
       try{
       
       await axios.post('http://localhost:8000/delete' ,{
                Question:deleteQuestion ,
                Category:deleteCat
        }).then((res)=>{
          
           setIsDataChanged(!isDataChanged)
           setIsdelete(isDeleted+1)
        }).catch((e)=>{
            console.log(e)
        })

       }catch(e){
        console.log(e)
       }
   }
    // useEffect(()=>{
    
    //     deleteApproval()

    // },[deleteQuestion])

//--------------------------------------------------------------
//--------------------------------------------------------------
const ApproveApproval = async (AppQuestion , AppCat)=>{
    try{
        console.log("in")
       await axios.post('http://localhost:8000/approveit' ,{
                Question:AppQuestion ,
                Category:AppCat
        }).then((res)=>{
            
            setIsDataChanged(!isDataChanged)
        }).catch((e)=>{
            console.log(e)
        })

       }catch(e){
        console.log(e)
       }
}
// useEffect(()=>{
  
//     ApproveApproval()

//    },[AppQuestion])


    const fetchToBeApproved = async () => {
        try {
           setIsLoading(true)
            await axios.get('http://localhost:8000/Approve', {}).then((res) => {
                
                setQuestionTobeApproved(res.data.response)
                if(res.data.response.length==0){
                    setIsData(false)
                    setIsLoading(false)
                }
                console.log(res.data.response)
                setIsLoading(false)
            }).catch((e) => {
                console.log(e)
                setIsLoading(false)
            })
        } catch (e) { }
    }

    useEffect(() => {
        fetchToBeApproved()
    }, [])
  

    return (
        <div className='hello'>
            {
                loading ? <Loader />:
                (
                    
                        isData ? <>{questionToBeApproved.map((question)=>{
                            return <div className='listItem' key={question.questionId}>
                               <List 
                               delete = {deleteApproval} approved={ApproveApproval} id={question.questionId} Category={question.Category} Question={question.Question} CreatedBy={question.CreatedBy} approve={question.approved}/>  
                            </div>
                          })}</>:<CatNa approvals={isData} />
                    
                )
          
            }
      
        </div>
    )
}
