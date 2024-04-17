const router = require("express").Router();
const User = require("../models/User.js");
const Post = require("../models/Post.js");

//CREATE A POST

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
 
  try {
    const savedPost = await newPost.save();
    res.status(200).json("Posted succesfully !" + savedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Like a post
router.post("/:id/like",async(req,res)=>{
  try {
   const post = await Post.findByIdAndUpdate(req.params.id,{

     $inc:{ likes : 1}
   });
  res.status(200).json(post);
 } catch (error) {
  res.json(error)
 }
})
router.post("/:id/unlike",async(req,res)=>{
  try {
   const post = await Post.findByIdAndUpdate(req.params.id,{

     $inc:{ likes : -1}
   });
  res.status(200).json(post.likes);
 } catch (error) {
  res.json(error)
 }
})

//Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
 Post.findByIdAndDelete(req.params.id);
        res.srouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if ( post.username === req.body.username) {
      try {
        awaitstatus(200).json("Post Has been deleted !!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your posts !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS

router.get('/',async(req,res)=>{
 const username = req.query.user;
 try{
    let posts;
    if(username){
        posts = await Post.find({username:username})
    }
    else{
        posts = await Post.find().sort({createdAt:-1})
        

    }res.status(200).json(posts);
 }catch(err){
    res.status(500).json(err)
 }
})

module.exports = router;
