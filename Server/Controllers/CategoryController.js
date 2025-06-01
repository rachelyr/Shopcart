import expressAsyncHandler from "express-async-handler";
import Categories from "../Models/CategoryModel.js";
import { categories } from "../Data.js";


//desc: import all categroies
//route POST /api/categories/import
//acess Private/Admin

const importCategories = expressAsyncHandler(async (req, res) => {
    try{
        //remove all categories
        await Categories.deleteMany({});
        //insert all categories
        const createdCategories = await Categories.insertMany(categories);
        res.status(201).send(createdCategories);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});



//desc: get all categories
//route GET /api/categories
//acess Public

const getCategories = expressAsyncHandler(async (req, res) => {
    try{
        const categories = await Categories.find({});
        res.status(200).json(categories);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});



//desc: create a category
//route POST /api/categories
//acess Private/Admin

const createCategory = expressAsyncHandler(async (req, res) => {
    try{
        const { name, image } = req.body;

        //checks if category exists
        const categoryExists = await Categories.findOne({ name }); //find if it exists by name
        if(categoryExists){
            res.status(400).json({message: "Category already exists"});
        }
        else {
            const category = new Categories({
                name,
                image
            });

            //save category
            const createdCategory = await category.save();
            //send response
            res.status(201).json(createdCategory);
        }
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});



//desc update a category
//route PUT /api/categories
//acess Private/Admin

const updateCategory = expressAsyncHandler(async (req, res) => {
    try{
        const { name, image } = req.body;
        const category = await Categories.findById(req.params.id);

        if(category){
            category.name = name || category.name;
            category.image = image || category.image;

            const updatedCategory = await category.save();
            res.status(201).json(updatedCategory);
        } else {
            res.status(404).json({message: "Category not found"});
        }
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});



//desc delete a category
//route DELETE /api/categories
//acess Private/Admin

const deleteCategory = expressAsyncHandler(async (req, res) => {
    try{
        const category = await Categories.findByIdAndDelete(req.params.id);

        if(category){
            res.status(201).json({message: "Category deleted"});
        } else {
            res.status(404).json({message: "Category not found"});
        }
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});


export { importCategories, getCategories, createCategory, updateCategory, deleteCategory };