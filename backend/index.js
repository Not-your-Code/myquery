
// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    }
    ,
    password: {
        type: String,
    },
    Role: {
        type: String
    }

})


const CategorySchema = new mongoose.Schema({
    Cat_name: {
        type: String,
        required: true,
    }

})

const QuestionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    CreatedBy: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,

    }
})
//   user model made
const Questions = new mongoose.model("Question", QuestionSchema, "Questions")
const Category = new mongoose.model("Category", CategorySchema, "Categories")

const User = new mongoose.model("User", userSchema, "users")

// connections
mongoose.connect('mongodb://127.0.0.1:27017/myquery').then(() => console.log("connected")).catch((error) => {
    console.log(error)
})


//signup code
app.post("/signup", async (req, res) => {
    async function execute() {
        try {
            const { email, passUser, name } = req.body
            const CheckEmail = await User.findOne({ email: email, })
            const CheckName = await User.findOne({ name: name })
            if (!CheckEmail && !CheckName) {
                const user = new User({

                    email: email,
                    password: passUser,
                    name: name,
                    Role: "User",
                })

                user.save().then(() => {
                    res.send({ message: "user registered", user })
                }).catch((e) => {
                    console.log('error', e.message)
                })
            }

            if (CheckEmail) {
                res.send({ message: "Email Already Exists" })
            }
            if (CheckName) {
                res.send({ message: "Name Already Exists" })
            }

        } catch (e) { }
    }

    execute()
})





app.post("/profile", async (req, res) => {

    async function execute() {
        try {
            const { name } = req.body;
            const getProfileDetail = await User.findOne({ name: name })

            if (getProfileDetail) {
                res.json(getProfileDetail)
            }

        } catch (e) { console.log(e) }
    }
    execute()
})

//add a question or category check idk what is going to be 

app.post("/add", async (req, res) => {

    async function execute() {
        try {
            const { name } = req.body;

            const check = await Category.findOne({ Cat_name: name })

            if (!check) {
                const newCat = new Category({
                    Cat_name: name
                })

                newCat.save().then(() => {
                    res.json({ response: "Saved" })
                }).catch((e) => {
                    res.json({ response: "!Saved" })
                })
            } else {
                res.json({ response: "Category already present" })
            }
        } catch (e) {
            console.log(e)
        }
    }
    execute()
})

//becomeAdim

app.post("/BecomeAdmin", async (req, res) => {

    async function execute() {
        try {
            const { user, pass } = req.body

            const updateProfile = await User.findOneAndUpdate({ name: user, password: pass }, { Role: "Admin" }, { new: true })
            if (updateProfile) {
                res.json({ message: "success", role: updateProfile.Role })
            } else {
                res.json({ message: "password Incorrect" })
            }


        } catch (e) {
            console.log(e)
        }
    }

    execute()
})


//login code 
app.post("/login", async (req, res) => {

    async function execute() {
        try {
            const { name, passUser } = req.body
            const check = await User.findOne({ name: name, password: passUser })
            if (check) {

                const sessionId = uuidv4();

                res.json({ success: true, sessionId: sessionId, id: check._id, role: check.Role })

            } else {
                res.json({ success: false })
            }
        } catch (e) {
            res.json(e)

        }
    }

    execute();
})


//get all categories if exists!

app.get("/getCategory", async (req, res) => {

    async function execute() {
        try {
            const check = await Category.find()
            if (check) {
                res.json({ message: "Sucess", result: check })
            } else {
                res.json({ message: "NA" })
            }
            
        } catch (e) {
            console.log(e)
        }
    }
    execute()
})



//Question code

app.post("/addQuestion", async (req, res) => {
    async function execute() {
       
        try {
           const {question , user , approved  , selectedCat} = req.body
         console.log(question , user , approved , selectedCat)
           const check = await Questions.findOne({Question:question , Category:selectedCat})
            if(check){
                res.json({message:"Question Exists already"})
            }else{
                const newQ = new Questions({
                    Question : question ,
                    CreatedBy : user,
                    Category:selectedCat,
                    approved:approved
                })

                newQ.save().then((res)=>{
                  res.json({message:"Created"})
                }).catch((e)=>{ 
                    res.json({message:"Error"})
                })
            }
        } catch (e) { }
    }
    execute()
})
app.listen(8000, () => {
    console.log("started")
})