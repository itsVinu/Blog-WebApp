const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')


router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

router.post('/register',async(req,res)=>{
    try{
        const user = new User({username:req.body.username,email:req.body.email})
        const newUser = await User.register(user,req.body.password)
        console.log(newUser)
        req.flash('success','User Registered Successfully')
        res.redirect('/login')
    }
    catch(e){
        req.flash('success','Cannot register')
        res.redirect('/register')
    }
    
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',
    passport.authenticate('local',
    {
        failureRedirect:'/login',
        failureFlash:true
    }
    ),(req,res)=>{
        try{
            req.flash('success','Welcome Back')
            res.redirect('/blogs')
        }
        catch(e){
            console.log(e.message)
            req.flash('error',e.message)
            res.redirect('/login')
        }
})

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/login')
})

module.exports = router;