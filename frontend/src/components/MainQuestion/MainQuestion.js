import React, { useState, useEffect ,useRef } from 'react'
import './MainQ.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { faSleigh } from '@fortawesome/free-solid-svg-icons'
import QuestionList from '../QuestionList/QuestionList'
import Navbar from '../navbar/Navbar'

export default function MainQuestion() {
    const [term, setTerm] = useState("")
    const [categories, setCategories] = useState([])
    const [questions, setQuestions] = useState([])
    const [loading, setIsLoading] = useState(false)
    const [isDataThere, setIsDataThere] = useState(Boolean)
    const [lastQuestionIndex, setLastQuestionIndex] = useState(6);
    const questionsRef = useRef(null);


    // const firstCategory = categories[0];
    // const defaultSelectedCategoryName = firstCategory.Cat_name

    const [selectedCat, SetSelectedCat] = useState("Security")


    const handleSelect = (e) => {
        SetSelectedCat(e.target.value)
    }



    useEffect(() => {
        if (questions.length === 0) {
            setIsDataThere(false)
        } else {
            setIsDataThere(true)
        }
    }, [questions])

    const fetchTheQuestion = () => {
        setIsLoading(true)
        axios.get('http://localhost:8000/getQuery', { params: { term: term } }).then((res) => {

            setQuestions(res.data.response)
            console.log(questions)
            setIsLoading(false)
        }).catch((e) => {
            console.log(e)
            setIsLoading(false)
        })
    }
    const fetchCategories = () => {
        try {

            axios.get("http://localhost:8000/getCategory")
                .then((res) => {

                    setCategories(res.data.result)
                    console.log(res.data.result)

                }).catch((res) => {

                    console.log(res)
                })
        } catch (e) { }
    }

    const scrollHandler = () => {
        const { scrollHeight, scrollTop, clientHeight } = questionsRef.current;
        if (scrollHeight - scrollTop === clientHeight) {
          setLastQuestionIndex((prevIndex) => prevIndex + 6);
        }
      };

     


    useEffect(() => {
        fetchTheQuestion()
        fetchCategories()
    }, [term])

    const optionItems = categories.map((category) => (
        <option key={category._id} value={category.Cat_name}   >
            {category.Cat_name}
        </option>
    ));


    return (
        <div className='main'>
            <nav>
                <Navbar/>
            </nav>
        <div className='MainCont'>
            <div className='title'>
            <h2>QueryHere</h2>
            </div>
            <div className='topMain'>
                <form id="topMainForm">
                    {/* <span>
                        <h4>Search By : </h4>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Category"/>
                        <label for="vehicle3"> Category</label>
                    </span> */}
                    <span className='MainTop'>
                        <label>Categories</label>
                        <select onChange={handleSelect}>{optionItems}</select>
                    </span>
                    <span className='MainTop'>
                        <label>Question</label>
                        <input placeholder='Enter Your Text' type='text' value={term} onChange={(e) => {
                            setTerm(e.target.value)
                        }} />

                    </span>
                </form>
            </div>
            <div className='bottomMain' ref={questionsRef} onScroll={scrollHandler}>
                <label >Questions</label>
                {
                    loading ? <div className='Loading'><Loader /> </div> : (
                        isDataThere ? (
                            <div className='Questions'>
                                
                                {
                                    questions.slice(0, lastQuestionIndex).map((question) => {
                                      return   <li key={question._id} id="questionList">
                                           <QuestionList Category={question.Category} Question={question.Question}/>
                                         </li>
                                    })
                                }   
                            </div>
                        ) : <div>no question available</div>
                    )
                }
            </div>
        </div>
        </div>
    )
}
