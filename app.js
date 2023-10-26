const express = require('express')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')

const app = express()

app.set('view engine', 'ejs')

//connecting to mongodb
mongoose.connect(keys.mongodb.dbURI).then((res)=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

app.use('/auth',authRoutes)

app.get('/',(req, res)=>{
    res.render('home')
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})