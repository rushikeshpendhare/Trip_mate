const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Post = require('../models/Post.js')

//UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You control only your account!");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try{
        const user = User.findById(req.params.id);
        try {
            await Post.deleteMany({username:user.username}) //Deleting all the posts by the yser
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User Has been deleted !!');
        } catch (err) {
            res.status(500).json(err);
        }
        }catch{
            res.status(404).json("User not found!")
        }
    } else {
        res.status(401).json("You control only your account!");
    }
});

//GET USER 
router.get('/:id',async (req,res)=>{
    
        try{
            const user = await User.findById(req.params.id);
            const {password,...others} = user._doc;
            res.status(200).json(others)
        }catch(err){
            res.status(500).json(err);
        }
    
})

module.exports = router;
