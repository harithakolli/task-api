const express = require("express");
const app= express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT  = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL).then((res) =>{
    console.log("Database connected");
    app.listen(PORT, ()=> 
      console.log(`server started at http://lcoalhost:${process.env.PORT}`)
      );
}).catch((e) => console.log(e));