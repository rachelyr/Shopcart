import {Router} from "express";
import * as CategoryController from "../Controllers/CategoryController.js";
import { protect } from "../middleware/Auth.js";

const router = Router();

router
.route('/')
.get(CategoryController.getCategories)
.post(protect, CategoryController.createCategory);

router.route('/import').post(CategoryController.importCategories);

router
.route('/:id')
.put(protect, CategoryController.updateCategory)
.delete(protect, CategoryController.deleteCategory); //putting protect in the routes means it needs authorization aka bearers token

export default router;