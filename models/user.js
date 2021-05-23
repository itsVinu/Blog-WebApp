const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Blog = require('./blogs')



const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    myblog:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ],
    favourate:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema)

module.exports = User;