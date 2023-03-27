
// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
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
 
 const User = new mongoose.model("User" , userSchema , "users")

// connections
mongoose.connect('mongodb://127.0.0.1:27017/myquery').then(() => console.log("connected")).catch((error) => {
   console.log(error)
})


//signup code
app.post("/signup" ,async(req , res)=>{
    async function execute(){
        try{
            const{email , passUser , name } = req.body
            const CheckEmail = await User.findOne({email:email , })
            const CheckName = await User.findOne({name :name })
            if(!CheckEmail && !CheckName ){
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

            if(CheckEmail){
                res.send({message:"Email Already Exists"})
            }
            if(CheckName){
                     res.send({message:"Name Already Exists"})
            }
    
        }catch(e){}
    }
    
    execute()
 })


app.post("/profile" , async (req, res)=>{

    async function execute(){
        try{
            const {name} = req.body;
            const getProfileDetail = await User.findOne({name:name})

            if(getProfileDetail){
               res.json(getProfileDetail)
            }

        } catch(e){ console.log(e)}
    }
    execute()
})
 //login code 
 app.post("/login" , async(req,res)=>{
   
   async function execute(){
        try{
            const{name , passUser} = req.body
            const check = await User.findOne({name:name,password:passUser})
            if(check){

               const sessionId = uuidv4();
             
               res.json({success :true , sessionId:sessionId, id: check._id } )

            }else{
                res.json({success :false})
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