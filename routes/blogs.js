const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs')
const Review = require('../models/review')
const { isLoggedIn } = require('../middelware');
const User = require('../models/user')

router.get('/blogs',async(req,res)=>{
    try{
        const blogs = await Blog.find({})

        res.render('blogs/index',{blogs});
    }
    catch(e){
        console.log(e.message)
        req.flash('error','Cannot Find Products!')
        res.render('error')
    }
})

// Create new blog
router.get('/blogs/new',(req,res)=>{
    res.render('blogs/new')
})

router.post('/blogs',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.create(req.body.blog)
        const user = req.user
        
        user.myblog.push(blog)
        await user.save()

        req.flash('success','Product Added Successfully')
        res.redirect('/blogs')
    }
    catch(e){
        console.log(e.message)
        req.flash('error','Something went Wrong, Cannot Add New Product')
        res.render('error')
    }
    
})

// Show detail of particular blog
router.get('/blogs/:id',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('reviews')
        
        res.render('blogs/show',{blog})
    }
    catch(e){
        console.log(e.message)
        req.flash('error','Cannot find this product')
        res.redirect('/error')
    }
})

router.get('/blogs/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        res.render('blogs/edit',{blog})
    }
    catch (e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this Product');
        res.redirect('/error');
    }
})

router.patch('/blogs/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id,req.body.blog)
        req.flash('success','Updated Successfully')
        res.redirect(`/blogs/${req.params.id}`)
    }
    catch(e){
        console.log(e.message)
        req.flash('error','Cannot Update Product Details')
        res.redirect('/error')
    }
})


// Deleting a blog
// router.delete('/blogs/:id',isLoggedIn,async(req,res)=>{
//     try{
//         const {id} = req.params.id
//         await User.findByIdAndUpdate(id,{$pull:{myblog:id}})
        
//         const blog = await Blog.findByIdAndDelete(req.params.id)

//         req.flash('success','Product Deleted Successfully')
//         res.redirect(`/user/${req.user._id}/myblog`);
//     }
//     catch(e){
//         req.flash('error','Cannot Delete Product')
//         res.redirect('/error')
//     }
    
// })




// Displaying and creating a new comment
router.post('/blogs/:id/review',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)

        const review = new Review(req.body)
        
        console.log(review)
    
        blog.reviews.push(review)
    
        await review.save()
        await blog.save()
        req.flash('success','comment added successfully')
        res.redirect(`/blogs/${req.params.id}`)
    }
    catch(e){

        console.log(e.message)
        req.flash('error','cannot add comment')
        res.redirect('/error')
    }
    
})



router.get('/error',(req,res)=>{
    res.status(404).send('error')
})

module.exports = router;