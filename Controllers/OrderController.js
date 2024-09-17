import Order from "../Models/OrderModel.js";
import Products from "../Models/ProductModel.js";
import expressAsyncHandler from "express-async-handler";
import { Orders } from "../Data.js";


//desc: create new order
//route: POST /api/shop/orders
//acess: Private

const createOrder = expressAsyncHandler(async (req, res) => {
    const { orderItems, subTotalPrice, totalPrice } = req.body;
    const delivery = {subTotalPrice, totalPrice}; // had to do this for validation

    // Create the order with the correct structure for delivery
    const order = new Order({
        orderItems,
        delivery,
        user: req.user._id
    });

    // const validationError = order.validateSync();
    // if (validationError) {
    //     console.log(validationError);  // Log detailed validation error
    //     return res.status(400).json({ message: validationError.message });
    // }

    // Reduce stock of products ordered
    for (const item of orderItems) {
        const product = await Products.findById(item.product);
        product.stock = product.stock - item.qty;
        await product.save();
    }

    const createdOrder = await order.save();
    res.status(201).json(createdOrder); // Send to client side
});


//desc: get user order
//route: GET /api/shop/orders
//acess: Private

const getUserOrders = expressAsyncHandler(async(req, res)=>{
    const orders= await Order.find({user: req.user._id})
    .sort({createdAt: -1});  //gives u new orders

    //get total orders - dashboard
    const totalOrders = await Order.countDocuments({user: req.user._id});

    //get pending orders
    const pendingOrders= await Order.countDocuments({
        user: req.user._id,
        'payments.status': 'Pending'
    });

    //get completed orders
    const completedOrders= await Order.countDocuments({
        user: req.user._id,
        'payments.status': 'Completed'
    });

    //get cancelled orders
    const cancelledOrders= await Order.countDocuments({
        user: req.user._id,
        'payments.status': 'Cancelled'
    });

    res.json({
        orders,
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders
    });
});


//desc: delete user order
//route: DELETE /api/shop/orders/:id
//acess: Private

const deleteOrder = expressAsyncHandler(async(req, res)=>{
    const order= await Order.findByIdAndDelete(req.params.id);

    if(order){
        res.json({message: "Order deleted"});
    } else{
        res.status(404).json({message: "Order not found"});
    }
});


//desc: get order by id
//route: GET /api/shop/orders/:id
//acess: Private

const getOrderById = expressAsyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id).populate('user',
         'fullName email phone');

         if(order){
            res.json(order)
         } else{
            res.status(404).json({message: "Order not found"});
         }
});


//desc: delete all orders(user dashboard)
//route: GET /api/shop/orders
//acess: Private

const deleteAllOrders = expressAsyncHandler(async(req, res)=>{
    await Order.deleteMany({
        user: req.user._id
    });

    res.json({message: "All orders deleted"});
});




export {createOrder, getUserOrders,getOrderById, deleteOrder, deleteAllOrders};