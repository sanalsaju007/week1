const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');//JSON
const mongoose = require('mongoose');// to connect mongodb schema
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 5000;
const DB_URI= 'mongodb://localhost:27017/project3';//mongodb compass

app.use(cors());
app.use(bodyParser.json());//JSON

mongoose.connect(DB_URI).then(()=>{
    console.log('connect to mongoDB');
}).catch((err)=>{
    console.error('failed to connect to mongoDB',err);
});

app.use('/',authRoutes);

app.listen(port,()=> console.log('server running on https://localhost:${5000}'))