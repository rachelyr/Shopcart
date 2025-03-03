import Order from "../Models/OrderModel.js";
import Products from "../Models/ProductModel.js";
import expressAsyncHandler from "express-async-handler";


//desc: create new order
//route: POST /api/orders
//acess: Private

const createOrder = expressAsyncHandler(async (req, res) => {
    try{
        const { orderItems, subTotalPrice, totalPrice } = req.body;
        // const delivery = {subTotalPrice, totalPrice}; // had to do this for validation

        console.log("🟡 Received order data:", req.body); // Debugging log
        // Create the order with the correct structure for delivery
        const order = new Order({
            orderItems,
            subTotalPrice,
            totalPrice,
            user: req.user._id
        });
        // Reduce stock of products ordered
        for (const item of orderItems) {
            const product = await Products.findById(item.product);
            product.stock = product.stock - item.qty;
            await product.save();
        }
        const createdOrder = await order.save();

        res.status(201).json(createdOrder); // Send to client side
        } catch(error){
        res.status(400).json({'message': error.message});
    }
});


//desc: get user order
//route: GET /api/orders
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
//route: DELETE /api/orders/:id
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
//route: GET /api/orders/:id
//acess: Private

const getOrderById = expressAsyncHandler(async(req, res)=>{
    try{
        const order= await Order.findById(req.params.id).populate(
            'user',
            'fullName email phone'
        );
         if(order){
            res.json(order)
         } else{
            res.status(404).json({message: "Order not found"});
         }
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: delete all orders(user dashboard)
//route: GET /api/orders
//acess: Private

const deleteAllOrders = expressAsyncHandler(async(req, res)=>{
    await Order.deleteMany({
        user: req.user._id
    });

    res.json({message: "All orders deleted"});
});


//desc: update order to paid
// from stripe
//@access; Private

// const updateOrderToPaid = expressAsyncHandler(async(req, res)=>{
//     //find order
//     const order = await Order.findById(customer?.metadata?.orderId);

//     //if order exists, update payment status to completed and save shipping address
//     if(order){
//         order.payments.status = data?.payment_status === 'paid' ? 'completed' : data?.payment_status === 'cancelled' ? 'cancelled' : 'pending';
//         order.payments.paymentMethod = 'Stripe'
//         order.payments.paymentDate = Date.now();
//         order.totalPrice = data?.amount_total / 100;
//         order.subTotalPrice = data?.amount_subtotal / 100;
//         order.shippingAddress = {
//             address: `Line 1: ${customer?.metadata?.address?.line1}, Line 2: ${customer?.metadata?.address?.line2}, Postal Code: ${data?.shipping?.address?.postalCode}, State: ${data?.shipping?.address?.state}, City: ${data?.shipping?.address?.city}`,
//             city: customer?.metadata?.city,
//             postalCode: customer?.metadata?.postalCode,
//             country: customer?.metadata?.country,
//             fullName: data?.customer_details?.name,
//             email: customer?.metadata?.email
//         };
//         //save the order
//         await order.save();
//     };
// });


export {createOrder, getUserOrders,getOrderById, deleteOrder, deleteAllOrders};