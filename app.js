const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')

const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()

app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

//initialize passport

app.use(passport.initialize())
app.use(passport.session())

//connecting to mongodb
mongoose.connect(keys.mongodb.dbURI).then((res)=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

app.get('/',(req, res)=>{
    res.render('home',{user:req.user})
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})