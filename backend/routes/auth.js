const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult}=require('express-validator');

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    [body('name',"Invalid name").isLength({ min: 3 }),
    body('email',"Invalid email").isEmail(),
    body('password',"Invalid password").isLength({ min: 5 })]
    , async(req,res)=>{
        // if there are errors, return errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // checking if email already exists
        else{
            try {
                let user=await User.findOne({email:req.body.email})
                if(user){
                    return res.status(400).json({error:"User with this email already exits"})
                }
                // creating user
                else{
                    user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    })
                    res.json(user)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
          
})

module.exports = router;