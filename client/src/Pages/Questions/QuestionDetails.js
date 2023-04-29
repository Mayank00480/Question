import React, { useState } from 'react'
import './QuestionDetails.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Avator from '../../components/Avator/Avator'
import up from '../../Assets/UpVote.svg'
import Down from '../../Assets/DownVote.svg'
import { useSelector, useDispatch } from 'react-redux'
import DisplayAnswers from './DisplayAnswers'
import { postAnswer } from '../../actions/question'
export default function QuestionDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const questionList = useSelector((state) => state.questionsReducer)
    const [Answer, setAnswer] = useState('')
    const User = useSelector((state) => (state.currentUserReducer))
    const handlePosAns = (e, answerLength) => {
        e.preventDefault()
        if (User === null) {
            alert('login or signup to answer a question')
            Navigate('/Auth')
        } else {
            if (Answer === '') {
                alert('Enter an Answer Before Submitting')
            }
            else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name }))
            }
        }

    }

    return (
        <div className="question-details-page">
            {
                questionList.data === null ?
                    <h1>Loading ...</h1> :
                    <>
                        {
                            questionList.data.filter((question) => question._id == id).map((question) => (
                                <div key={question._id}>
                                    <section className="question-details-container">
                                        <h1>{question.questionTitle}</h1>
                                        <div className="question-details-container-2">
                                            <div className="question-votes">
                                                <img src={up} alt="upvotes" />
                                                <p>{question.upVote - question.downVote}</p>
                                                <img src={Down} alt="downvotes" />
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <p className="question-body">{question.questionBody}</p>
                                                <div className="question-details-tags">
                                                    {question.questionTags.map((tags) =>
                                                        <p key={tags} >{tags}</p>)}
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type='button'>Share</button>
                                                        <button type='button'>Delete</button>
                                                    </div>
                                                    <div>
                                                        <p>asked {question.AskedOn}</p>
                                                        <Link to={`/User/${question.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                                                            <Avator backgroundColor="Orange" px="8px" py="5px"> {question.userPosted.charAt(0).toUpperCase()}</Avator>
                                                            <div>{question.userPosted}</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                    {
                                        question.noOfAnswers !== 0 && <section>
                                            <h3>{question.noOfAnswers} answers</h3>
                                            <DisplayAnswers key={question._id} question={question} />
                                        </section>
                                    }
                                    <section className="post-ans-container">
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => { handlePosAns(e, question.answer.length) }}>
                                            <textarea name="" id="" rows="10" cols="30" onChange={e => setAnswer(e.target.value)} />
                                            <input type="submit" value='Post Your Answer' className="post-ans-btn" />
                                        </form>
                                        <p>
                                            Browse Other Question Tagged
                                            {question.questionTags.map((tags) => (
                                                <Link to="/Tags" key={tags} className="ans-tags"> {tags} </Link>
                                            ))
                                            } or <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>Ask Your Own Question.</Link>
                                        </p>
                                    </section>

                                </div>




                            ))
                        }
                    </>
            }

        </div>

    )
}