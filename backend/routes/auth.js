const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult}=require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const bcrypt=require('bcryptjs');
const jwt = require ('jsonwebtoken');

// My Sign
const JWT_SECRET ='mySecretString';

// Testing account
// {
//     "email":"luqman1234@gmail.com",
//     "password":"123456"
// }

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    [body('name',"Invalid name").isLength({ min: 3 }),
    body('email',"Invalid email").isEmail(),
    body('password',"Invalid password").isLength({ min: 5 })]
    , async(req,res)=>{
        let success=false;
        // if there are errors, return errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
        }
        // checking if email already exists
            try {
                let user=await User.findOne({email:req.body.email})
                if(user){
                    return res.status(400).json({success, error:"User with this email already exits"})
                }
                // creating user
                const salt=await bcrypt.genSalt(10);
                const secPass= await bcrypt.hash(req.body.password,salt)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass,
                })
                const Data={
                    user:{
                        id:user.id
                    }
                }
                const authToken=jwt.sign(Data,JWT_SECRET);
                success=true;
                res.json({success, authToken});
                
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error occured")
            }
          
})
// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',
        [body('email','Invalid email').isEmail(),
         body('password','Invalid pass').exists()],
        async(req,res)=>{
            const{email,password}=req.body; 
            let success=false; 

            // if there are errors, return errors
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({password,success,errors:errors.array()});
            }
            
            // Authenticating a user
            try {

                // checking if user exists through email
                const user= await User.findOne({email});
                console.log(user);
                
                if(!user){
                    return res.status(400).json({success,error:"Enter valid email"});
                }

                // Checking for password
                const passCompare = await bcrypt.compare(password,user.password)
                console.log(passCompare);
                if(!passCompare){
                    return res.status(400).json({success,error:"Enter valid pass"});
                }
                    // If user exists give authentication token
                    const Data={
                        user:{
                            id:user.id
                        }
                    }
                    const authToken= jwt.sign(Data,JWT_SECRET);
                    success=true;
                    console.log(success + authToken);
                    res.json({success,authToken});

            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error occured")
            }

})
// Route 3: Get loggedin user details using: POST "/api/auth/getuser".login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }
})

module.exports = router;