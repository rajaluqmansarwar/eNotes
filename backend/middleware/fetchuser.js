const jwt = require ('jsonwebtoken');
const JWT_SECRET ='mySecretString';

const fetchuser = (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
      return  res.status(401).send({error:"Please authenticate token"});
    }
    try {
            const string =jwt.verify(token,JWT_SECRET);
            req.user=string.user;
            next();
        } 
    catch (error) {
             res.status(401).send({error:"Please authenticate token"});
        }
}

module.exports = fetchuser;