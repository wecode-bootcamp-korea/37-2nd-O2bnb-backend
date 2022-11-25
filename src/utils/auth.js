const jwt = require("jsonwebtoken");
const key = process.env.KEY;


const validToken = async(req, res, next) =>{
    try{
        const userToken = req.header("authorization");
        if( !userToken ) return res.status(400).json({message : "KEY_ERROR" });
        const decoded = jwt.verify(userToken, key);
        const {user_id} = decoded;
        req.userId = user_id;

        return next();
    }
    catch(err){
        const error = new Error("INVALID_TOKEN");
        error.statusCode = 400;
        next;
    }
}

const validTokenNull = async(req, res, next) =>{
    try{
        const userToken = req.header("authorization");
        if( !userToken ) return next();
        const decoded = jwt.verify(userToken, key);
        const {user_id} = decoded;
        req.userId = user_id;

        return next();
    }
    catch(err){
        const error = new Error("INVALID_TOKEN");
        error.statusCode = 400;
        next;
    }
}
module.exports = {
    validToken, 
    validTokenNull
}