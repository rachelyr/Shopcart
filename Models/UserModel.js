import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true,
        default:"https://ui-avatars.com/api/?background=DDEDF7&color=3474E3&&name=Profile&size=1"
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},
   {
    timestamps: true
   }
);

export default mongoose.model("User", UserSchema)