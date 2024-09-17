import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

//desc authenticated user & get token
const generateToken= (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//protect routes
const protect = expressAsyncHandler(async(req, res, next) => {
    let token;

    //check if token is sent to the header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
    {
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1];
            //decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user from token
            req.user = await User.findById(decoded.id).select('-password'); //select('-password'): This excludes the password field from the user object that is attached to req.user, ensuring that the password is not exposed.
            next();
        } catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }
    //check if token is not sent in the header
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token');
    }
});


export { generateToken, protect };