
// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cors())


const userSchema = new mongoose.Schema({
 
    name:{
     type:String,
    },
     email: {
        type: String,
     }
     ,
     password: {
        type: String,
     }
  
  })

//   user model made
 
 const User = new mongoose.model("user" , userSchema)

// connections
mongoose.connect('mongodb://127.0.0.1:27017/myquery').then(() => console.log("connected")).catch((error) => {
   console.log(error)
})


//signup code
app.post("/signup" ,async(req , res)=>{
    async function execute(){
        try{
            const{email , passUser , name } = req.body
            const data = await User.findOne({email:email})
    
            if(!data){
                const user = new User({
                    
                    email:email,
                    password:passUser,
                    name:name,
                })
    
                user.save().then(()=>{
                    res.send({message:"user registered" , user})
                }).catch((e)=>{
                    console.log('error' , e.message)
                })
            }
    
        }catch(e){}
    }
    
    execute()
 })

 //login code 
 app.post("/login" , async(req,res)=>{
   
   async function execute(){
        try{
            const{email , passUser} = req.body

            const check = await User.findOne({email:email,password:passUser})

            if(check){
               res.send({message :"logged in"})
          
            }else{
                res.send({message :"Incorrect Details"})
               
            }
        }catch(e){
            res.json(e)
    
        }
    }

    execute();
     })

app.listen(8000 , ()=>{
    console.log("started")
})