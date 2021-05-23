const express = require('express');
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const seedDB = require('./seed')
const path = require('path')
const User = require('./models/user')

//configuring session and authentication
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')


//Getting Routes
const blogRoute = require('./routes/blogs')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/mypost')


app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))



mongoose.connect('mongodb://localhost:27017/blogApp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("OH NO ERROR!!!");
        console.log(err);
    });

// seedDB();

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

//Configuring the passport for local strategy
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})



app.use(blogRoute)
app.use(authRoute)
app.use(postRoute)



app.listen(3000,()=>{
    console.log('server started at port 3000 successfully')
})