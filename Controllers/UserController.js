import User from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import { users } from "../Data.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/Auth.js";
import Order from "../Models/OrderModel.js";



//@desc import all users
//@route POST /api/users/import/all
//@access Private/Admin

const importUsers = expressAsyncHandler(async (req, res) => {
    console.log("importUsers function called");
    await User.deleteMany({}); //delete all users in the database
    const createdUsers = await User.insertMany(users);// insert all users in the database
    res.status(201).send({ createdUsers });
});

// const importUsers = expressAsyncHandler(async (req, res) => {
//     try {
//         console.log("importUsers function called");
//         await User.deleteMany({}); //delete all users in the database
//         const createdUsers = await User.insertMany(users);// insert all users in the database
//         res.status(201).send({ createdUsers });
//     } catch (error) {
//         console.error("Error in importUsers:", error);
//         res.status(500).send({ message: "Failed to import users" });
//     } ----use this to catch error
// });



//desc: Login
//route: POST /api/users/login
//access: Public
const login = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body; //for login page
        //find user by email
        const user = await User.findOne({ email });
        if (user){
            //compare password
            if (bcrypt.compareSync(password, user.password)) {
                res.json({
                    _id: user._id,
                    name: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    image: user.image,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id), //generate a token for authentication in the frontend
                });
            }
            else{
                res.status(401).json({message: "Invalid password"})
            }
        }
        else{
            res.status(401).json({message: "Invalid email"})
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// @desc Register a new user
// @route POST /api/users
// @access Public

const register = expressAsyncHandler(async (req, res) => {
    try{
        const { fullName, email, phone, password } = req.body;
        //find user through email
        const userExists = await User.findOne({ email });

        //check if user exists

        if(userExists){
            res.status(400)
            throw new Error("User already exists")
        }
        //create new user
        else{
            const user = await User.create({
                fullName,
                email,
                phone,
                password: bcrypt.hashSync(password, 10)  //hash password
                });
        //send response
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), //generate a token for authentication in the frontend
            });
        }
        else{
            res.status(400)
            throw new Error("Invalid user data");
        }
       };
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//desc: update user profile
//route: PUT /api/users
//access: Private

const updateProfile = expressAsyncHandler(async (req, res) => {
    try{
    //find user by id
    const user = await User.findById(req.user._id);
    //check if user exists
    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.image = req.body.image || user.image;

        //save user
        const updatedUser = await user.save();
        //send response
        res.json({
            _id: updatedUser._id,
            name: updatedUser.fullName,
            email: updatedUser.email,
            phone: updatedUser.phone,
            image: updatedUser.image,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id), //generate token
        });
    }
    else{
        res.status(404)
        throw new Error("User not found");
    }
    }catch{
        res.status(400).json({ message: error.message });
    }
});


//desc: change user password
//route: PUT /api/users/password
//access: Private

const changePassword = expressAsyncHandler(async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        //find user by id
        const user = await User.findById(req.user._id);
        //if the old pass matches the new pass
        if (user){
            if (bcrypt.compareSync(oldPassword, user.password)) {
                user.password =bcrypt.hashSync(newPassword, 10);

                //save the user
                await user.save();
                //send response
                res.json({
                    message: 'Password changed successfully',
                });
            }
            else{
                res.status(401)
                throw new Error("Invalid old password"); //this Error statment may be different
            }
        }
        else{
            res.status(404)
            throw new Error("User not found");
        }
    }catch (error){
        res.status(400).json({ message: error.message });
    }
});


//desc: delete user account
//route: DELETE /api/users/
//acceses: Private

const deleteUser= expressAsyncHandler(async (req, res) => {
    try {
        //find user by id and delete
        const user = await User.findByIdAndDelete(req.user._id);
        //check if user exists
        if (user) {
            //delete user's orders
            await Order.deleteMany({ user: req.user._id });
            res.json({ message: 'User Account Deleted' });
        }
        else{
            res.status(404)
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



export {importUsers, login, register, updateProfile, changePassword, deleteUser};