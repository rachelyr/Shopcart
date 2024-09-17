import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDb} from './config/Db.js';
import userRouter from './Routers/UserRoute.js';
import { errorHandler } from './middleware/Error.js';
import CategoryRouter from './Routers/CategoryRouter.js';
import ProductRouter from './Routers/ProductRouter.js';
import OrderRouter from './Routers/OrderRouter.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`Environment variable PORT is: ${process.env.PORT}`);

//connect db
connectDb();

//main route
app.get('/', (req, res) => {
    res.send('Hello World! woahh');
});

//other routes
app.use('/api/users', userRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);

//error handler
app.use(errorHandler);

//port
const port = process.env.PORT || 5000;

//listen
app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});

