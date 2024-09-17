import {Router} from "express";
import * as ProductController from "../Controllers/ProductController.js";
import { protect } from "../middleware/Auth.js";


const router = Router();

router
    .route('/')
    .get(ProductController.getProducts)
    .post(protect, ProductController.createProduct)

router.route('/import').post(ProductController.importProducts);

router.route('/:id')
    .get(ProductController.getProductById)
    .delete(protect, ProductController.deleteProduct)
    .put(protect, ProductController.updateProduct);

router.route('/all/tags').get(ProductController.getTags);



export default router;