import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    images:[{type:String, required:true}],
    colors: [{ 
        colorName: {type:String},
        code: {type:String},
        image:[{type:String}]
    }],
    size: [{type:String}],
    description:{type:String, required:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories',
        required:true
    },
    tags:[{type:String}],
    salesOffer:{
        status: { type: Boolean, default: false, required: true },
        discount: { type: Number, default: 0, required: true }
    },
    stock:{type:Number, default:0, required:true},
},
   {
    timestamps: true
   }
);

export default mongoose.model("Products", ProductsSchema)