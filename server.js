const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const bodyParser = require('body-parser')
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI

//connect to Mongoose DB

mongoose.connect(db)
.then(()=>console.log("MongoDB connected"))
.catch(()=>console.log(err))

//let's write our first route
app.get('/',(req,res)=>res.send("Hello"))

//get is used to get information from the server
//post is used to post information to the server
//use is used when the server is redirecting to a different path/javascript file

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts)


const port = 8080
app.listen(port, ()=>console.log(`Server running on port ${port}`))
