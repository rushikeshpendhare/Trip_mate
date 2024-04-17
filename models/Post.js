const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required : true,
    },
    content:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        required:false

    },
    pic:{
        type:String,
        
    }
},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema);