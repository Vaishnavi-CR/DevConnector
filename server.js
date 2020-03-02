const express = require('express');
const mongoose = require('mongoose')
const app = express();

//DB config
const db = require('./config/keys').mongoURI

//connect to Mongoose DB

mongoose.connect(db)
.then(()=>console.log("MongoDB connected"))
.catch(()=>console.log(err))

//let's write our first route
app.get('/',(req,res)=>res.send("Hello"))
const port = 8080
app.listen(port, ()=>console.log(`Server running on port ${port}`))
