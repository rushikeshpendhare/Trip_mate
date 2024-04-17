const router = require('express').Router();
const User = require('../models/User.js') ;
const bcrypt = require('bcrypt');

// Registering user
router.post('/register',async(req,res)=>{
    
    try{
        const formerUser = await User.findOne({username:req.body.username});
        if(formerUser){
            res.status(409).json("User already exists")
        }
        else{

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password,salt);
            const newUser = new User({
                username:req.body.username,
                email: req.body.email,
                password: hashedPass
            });
            const user = await newUser.save();
            res.status(200).json(user);
        }
        }catch(err){
            res.send(err);
        }
    })

//Login

router.post('/login',async (req,res)=>{
    try{

        const user = await User.findOne({username:req.body.username});
        if(!user){
            res.status(400).json('Wrong Credentials !')
        }
    const isValidated = await bcrypt.compare(req.body.password,user.password);
    if(!isValidated){
        res.status(400).json("Wrong Password")
    };
    res.status(200).json(user)
}catch(err){
    res.status(500).json(err);
}
})

module.exports = router