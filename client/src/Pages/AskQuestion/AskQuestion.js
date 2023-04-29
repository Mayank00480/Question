import React,{useState} from 'react'
import './AskQuestion.css'
import {useDispatch ,useSelector} from 'react-redux'
import  { useNavigate } from 'react-router-dom'
import {askQuestion} from '../../actions/question'

export default function AskQuestion() {
       const [questionTitle, setQuestionTitle] =useState('')
       const [questionBody, setQuestionBody] =useState('')
       const [questionTags, setQuestionTags] =useState('')
       const dispatch = useDispatch();
       const User = useSelector((state) => (state.currentUserReducer))
       const navigate = useNavigate()
       const handleSubmit = (e) =>{
              e.preventDefault();
               dispatch(askQuestion({questionTitle ,questionBody,questionTags,userPosted : User?.result.name},navigate))
            }
       const handleEnter = (e) => {
        if(e.key === 'Enter')
        {
            setQuestionBody(questionBody + " \n")
        }
       }

  return (<div className = "ask-container">
    <div className = "ask-ques-container">
        <h1>Ask a Public Question</h1>
    <form onSubmit = {handleSubmit}>
        <div className = "ask-form-container">
            <label htmlFor = "ask-ques-title">
                <h4>title</h4>
                <p>Be specific ad imagine you'r asking a question to another person</p>
                <input type = "text" onChange = {(e) => {setQuestionTitle(e.target.value)}} placeholder = "e.g. Is there an R function for finding the index of an element in a vector?" id = "ask-ques-title" />
            </label>
            <label htmlFor = "ask-ques-body">
                <h4>Body</h4>
                <p> Include all the information someone would need to answer your
                question</p>
                <textarea rows ="10" id = "ask-ques-body" cols ="30" name = "" onChange = {(e) => {setQuestionBody(e.target.value)}} onKeyPress = {handleEnter}></textarea>
            </label>
            <label htmlFor = "ask-ques-tags">
                <h4>Tags</h4>
                <p>Add up to 5 tags to describe what your question is about</p>
                <input type = "text" placeholder = "e.g. (xml typescript wordpress)" id = "ask-ques-tags" onChange = {(e) => {setQuestionTags(e.target.value.split(' '))}} />
            </label>
        </div>
        <input type ="submit" value = "Review Your Question" className = "review-btn" />
    </form>
 
    </div>
   
  
</div>
    )
}
