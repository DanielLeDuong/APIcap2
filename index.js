//WF3Xhi73BH6dXiOr
//mavoiem

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./ApiUser/Register')
const cookieParser = require('cookie-parser')
//post
const authRoute = require('./routes/auth')
const app = express()

//get
const userRoute = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

//connect
mongoose.connect('mongodb+srv://mavoiem:WF3Xhi73BH6dXiOr@cap2api.evksd.mongodb.net/Cap2API?retryWrites=true&w=majority')


//authentication

app.post('/register',(req,res) =>{
    RegisterModel.create(req.body)

    .then(regis => res.json(regis))
    .catch(err => res.json(err))
})

app.post('/login', (req,res) => {
    const {username,password} = req.body

    RegisterModel.findOne({username: username})
    .then(user => {
        console.log(user);
        if(user){
            if(user.password === password){
                res.json("Success")
            } 
            else { res.json("the password is incorrect")}
        } else {res.json('No existed')}
    })
})


//update
app.put('/update', async (req,res) => {
    const {id, ...rest} = req.body

    console.log(rest)
    const data = await RegisterModel.updateOne({_id: id}, rest)
    res.send({success: true, message:"update successfull", data: data})
})

//Route
app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)

app.listen(3001, () => {
    console.log("server is running")
})