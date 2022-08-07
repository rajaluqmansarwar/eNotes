const connectToMongo= require('./db');
const express= require('express');

connectToMongo();
const app=express();
const port=5000;

// for testing requests and view response in json 
app.use(express.json());
// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));

// Listening to port
app.listen(port,()=>{
    console.log(`Example app listening at port:${port}`);
})
