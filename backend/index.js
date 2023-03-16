
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
 
 const User = new mongoose.model("user" , userSchema)

mongoose.connect('mongodb://127.0.0.1:27017/myquery').then(() => console.log("connected")).catch((error) => {
   console.log(error)
})

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
    
    execute();
        // const {email , pass } = req.body;
    
    
        // const data = {
        //     email : email,
        //     password : pass
        // }
        // try{
    
        //     const check = await user.findOne({email:email})
    
        //     if(check){
        //         res.send({message :"exists"})
        //     }else{
        //         user.save().then(() => {
        //             console.log("done")
        //          }).catch((e) => {
        //             console.log("!done")
        //          });
        //     }
    
        // }catch(e){
        //     res.json(e)
    
        // }
    })


app.listen(8000 , ()=>{
    console.log("started")
})