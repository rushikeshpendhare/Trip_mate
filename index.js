const express = require('express');
const app = new express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts')
const genAiroute = require('./routes/genAi')
const cors = require('cors')
const multer = require("multer");
const path = require("path");
// const BASE_URL = process.env.BASE_URL;


dotenv.config();
app.use(express.json())
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")));
const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URL,{
    serverSelectionTimeoutMS: 20000,
}).then(console.log("Database connected !")).catch((error)=>{console.log(error)});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});
app.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})

app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/posts',postRoute);
app.use('/prompt',genAiroute)

app.listen(PORT,()=>{
    console.log("Server started running on port " + PORT)
})