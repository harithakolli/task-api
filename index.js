// const express = require('express');
// const app = express();
const app= require('./app');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then((res) =>{
    console.log("Database connected");
  
    
}).catch((e) => console.log(e));

