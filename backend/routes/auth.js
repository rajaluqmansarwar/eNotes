const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult}=require('express-validator');

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/',
    [body('name',"Invalid name").isLength({ min: 3 }),
    body('email',"Invalid email").isEmail(),
    body('password',"Invalid password").isLength({ min: 5 })]
    , async(req,res)=>{
        // Handling error messages
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let user=User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"User with this email already exits"})
        }
            user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
        //   .then(user => res.json(user))
        //   .catch(err=> {console.log(err)
        //     res.json({error:"Invalid email",message:err.message})} )
          
})

module.exports = router;