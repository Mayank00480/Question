import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/Users.js'
 import questionRoutes from './routes/Questions.js'
 import answerRoutes from './routes/Answers.js'
const app = express();
app.use(express.json({limit : "30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}))
app.use(cors())

app.get('/' , (req,res) =>
  res.send("This is your stack overflow api")
   )
 app.use('/user', userRoutes)
 app.use('/questions' ,questionRoutes)
 app.use('/answer',answerRoutes)

const port = process.env.PORT || 5000;
const CONNECTION = "mongodb+srv://Mayank:Mayank@stack-overflow-clone.ywg20oi.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION , {useNewUrlParser : true,useUnifiedTopology : true}).then(() => app.listen(port , () => {console.log(`App is running at ${port}`)}) ).catch((err) => {console.log(err)});
