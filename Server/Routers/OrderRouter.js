import {Router} from "express";
import * as OrderController from "../Controllers/OrderController.js";
import { protect } from "../middleware/Auth.js";


const router = Router();

router
   .route('/')
   .post(protect, OrderController.createOrder)
   .get(protect, OrderController.getUserOrders)
   .delete(protect, OrderController.deleteAllOrders);

router
   .route('/:id')
   .delete(protect, OrderController.deleteOrder)
   .get(protect, OrderController.getOrderById);


export default router;