import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems:[
        {
            size: { type: String, required: false },
            qty: { type: Number, required: true },
            name: { type: String, required: true },
            color: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            }
            }
        ],
        shippingAddress: {
            fullName: { type: String },
            address: { type: String },
            email: { type: String, trim: true, lowercase: true },
            location: { type: String },
            phoneNumber: { type: String},
            shippingMethod: { type: String },
            shippingCost: { type: Number },
        },
        payments:{
            paymentMethod: { type: String },
            status: { type: String, default: "Pending", required: true },
            paymentDate: { type: Date },
        },
        delivery:{
            status: { type: String, default: 'awaiting', required: true },
            subTotalPrice: { type: Number, required: true },
            taxPrice: { type: Number, required: true, default: 0.0 },
        }
},
   {
    timestamps: true
   }
);

export default mongoose.model("Order", OrderSchema)