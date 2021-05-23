const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Blog = require('../models/blogs')
const {isLoggedIn} = require('../middelware')

// Getting all favourate blogs
router.get('/user/:userId/favourate',isLoggedIn,async(req,res)=>{
    const user = await User.findById(req.params.userId).populate('favourate')

    res.render('favourate/like',{blogs : user.favourate})
})
// Displaying all favourate blogs
router.post('/user/:id/favourate',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        const user = req.user

        user.favourate.push(blog)
        await user.save()
        
        req.flash('success','Added to favourate')
        res.redirect(`/user/${req.user._id}/favourate`)
    }
    catch(e){
        req.flash('error','cannot add to favourate')
        res.render('error')
    }
})

// Showing the particular favourate blog
router.get('/user/:userId/favourate/:id',isLoggedIn,async(req,res)=>{
    const blog =  await Blog.findById(req.params.id)
    res.render('favourate/show',{blog})
})

//Deleting from favourate
router.delete('/user/:userid/favourate/:id', async(req, res) => {

    const { userid, id } = req.params;
    await User.findByIdAndUpdate(userid,{$pull:{favourate:id}})
    res.redirect(`/user/${userid}/favourate`);
})




// Getting Blogs of User
router.get('/user/:userId/myblog',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('myblog')

        res.render('post/myPost',{blogs : user.myblog})
    }catch(e){
        res.redirect('/blogs')
    }
})


router.get('/user/:userId/myblog/:id',isLoggedIn,async(req,res)=>{
    const blog =  await Blog.findById(req.params.id)
    res.render('post/show',{blog})
})

router.get('/user/:userId/myblog/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        res.render('post/edit')
    }
    catch(e){
        res.render('error')
    }
})

router.patch('user/:userid/myblog/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id,req.body.blog)
        req.flash('success','Blog Updated Successfully')
        res.redirect(`/user/${req.user._id}/myblog/${req.params.id}`)
    }
    catch(e){
        req.flash('error','Cannot update Blog, Something went wrong')
        res.redirect('/error')
    }
    
})

router.delete('/user/:userid/myblog/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userid,id} = req.params
        await Blog.findByIdAndUpdate(userid,{$pull:{myblog:id,favourate:id}})

        
        const blog = await Blog.findByIdAndDelete(req.params.id)

        req.flash('success','Product Deleted Successfully')
        res.redirect(`/user/${req.user._id}/myblog`);
    }
    catch(e){
        req.flash('error','cannot delete the blog')
        res.redirect('/error')
    }
})






module.exports = router;