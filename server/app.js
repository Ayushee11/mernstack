const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express()

dotenv.config({path:'./config.env'})
require('./db/conn')
//const User=require('./model/userSchema')
app.use(express.json())

app.use(require('./router/auth'))

const PORT=process.env.PORT

//const PORT=process.env.PORT


//Middleware
const middleware=(req,res,next)=>{
     console.log("Hello my middleware")
     next();
}



// app.get('/',(req,res)=>{
//      res.send('Hello world from the server from app.js')
// })

app.get('/about',middleware,(req,res)=>{
     console.log('Hello')
     res.send('Hello about world from the server')
})
app.get('/contact',(req,res)=>{
     res.send('Hello contact world from the server')
})

app.get('/signin',(req,res)=>{
     res.send('Hello login world from the server')
})
app.get('/signup',(req,res)=>{
     res.send('Hello registration world from the server')
})
//console.log('Subscribe')

app.listen(PORT,()=>{
     console.log( `server is running at port no ${PORT}`)
})