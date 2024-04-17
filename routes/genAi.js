const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')

dotenv.config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.get('/',async(req,res)=>{
    try {
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        const prompt = req.body.prompt
        
        const result = await model.generateContent(prompt);
        const response =  result.response;
        const text = response.text();
        
        res.status(200).send(text)
    } catch (error) {
        res.json(error)
    }
    })

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."

//   const result = await model.generateContent(prompt);
//   const response =  result.response;
//   const text = response.text();
//   console.log(text);
// }

module.exports = router

