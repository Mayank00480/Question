import Questions from '../models/Questions.js'
export const AskQuestion = async(req,res) => {
const postQuestionData =req.body;
const postQuestion = new Questions({...postQuestionData, userId : req.userId})
try{
    await postQuestion.save()
    res.status(200).json("Question Posted Successfully")
}
catch(error)
{
    console.log(error)
    res.status(409).json("Couldn't Post a Question")
}
}
export const getAllQuestions = async(req,res) =>{
    try {
        const questionList = await Questions.find()
        console.log(questionList)
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}