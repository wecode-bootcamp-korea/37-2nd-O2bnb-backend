const jwt = require("jsonwebtoken");
const key = process.env.KEY;


const validToken = async(req, res, next) =>{
    try{
        const userToken = req.header("authorization");
<<<<<<< HEAD
        console.log(userToken)
=======
>>>>>>> feature/getProducts
        if( !userToken ) return res.status(400).json({message : "KEY_ERROR" });
        const decoded = jwt.verify(userToken, key);
        const {user_id} = decoded;
        req.userId = user_id;
<<<<<<< HEAD

        return next();
    }
    catch(err){
        const error = new Error("INVALID_TOKEN");
        error.statusCode = 400;
        next;
    }
=======
    
        return next();   
    }
    catch(err){
        const error = new Error("INVALID_TOKEN");
        error.statusCode = 400;
        next(error);
    }

>>>>>>> feature/getProducts
}

module.exports = {
    validToken
}