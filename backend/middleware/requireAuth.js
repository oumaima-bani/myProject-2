import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }
    
    console.log('Authorization header:', authorization);

    //take the token from the Authorization header
    const token = authorization.split(' ')[1]
    try{
        //we verify the token with jwt secret if it's OK then we grab the id from the token 
        const {_id} =  jwt.verify(token, process.env.JWT)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'request is not authorized'})
    }
}
export default requireAuth;