const express = require('express');
const router = express.Router();
const Note = require ('../models/Note');
const fetchuser = require ('../middleware/fetchuser');
const {body,validationResult}= require('express-validator');

// Route 1: Fetching Notes Using : GET "/api/note/fetchusernote"
    router.get('/fetchusernote',fetchuser,async (req,res)=>{
        try {
            const note= await Note.find({user:req.user.id});
            res.json(note);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured")
        }
    })

// Route 2: Adding Notes Using : POST "/api/note/addnote"
    router.post('/addnote',fetchuser,
    [body('title','Title should be atleast 3 character long').isLength({min:3}),
    body('description','description should be atleast 5 character long').isLength({min:5})],
    async (req,res)=>{
        try {
            // Taking input through destructuring
                const {title,description,tag}=req.body;

            // For checking errors and displaying responses
                const errors= validationResult(req)
                if(!errors.isEmpty){
                    return res.status(400).json({errors:errors.array()});
                }
            // Adding Notes
                const note = await new Note({
                    user:req.user.id,
                    title,
                    description,
                    tag
                })
                note.save();
                res.json(note);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured")
        }
    })

// Route 3: Updating Notes Using : PUT "/api/note/updatenote/:id"

    router.put('/updatenote/:id',fetchuser,async(req,res)=>{
            try {
            const {title,description,tag}=req.body;
            
            // Checking if note to be updated exists
            const note = await Note.findById(req.params.id)
                if(!note){
                    return res.status(400).send("Note doesn't exists");
                }
            
            // Checking update request is made by user who created it.
                if(note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }
            
            // Updating Note
                const updatedNote = {};
                if(title){updatedNote.title=title};
                if(description){updatedNote.description=description};
                if(tag){updatedNote.tag=tag};

                const newNote = await Note.findByIdAndUpdate(req.params.id,{$set:updatedNote},{new:true});
                res.json(newNote);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error occured")
            }

    })
// Route 3: Delete Notes Using : Delete "/api/note/deletenote/:id"
    router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
       try {
             // Checking if note to be deleted exists
                const note= await Note.findById(req.params.id);
                if(!note){
                    return res.status(400).send("Note doesn't exists");
                }
        
            // Checking if note to be deleted belongs to logged in user
                if(note.user.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }

            // Deleting Note
                const deletedNote = await Note.findByIdAndDelete(req.params.id);
                res.json({"Message":"Successfully Deleted!",deletedNote:deletedNote});
       } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error occured")
       }
})

module.exports = router;