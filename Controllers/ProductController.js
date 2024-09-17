import expressAsyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { products } from "../Data.js";


//desc: import all products
//route POST /api/products/import
//acess Private/Admin

const importProducts = expressAsyncHandler(async (req, res) => {
    try{
        //delete all products
        await Product.deleteMany({});
        //insert all products
        const createdProducts = await Product.insertMany(products);
        res.status(201).send(createdProducts);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: create all products
//route POST /api/products
//acess Private/Admin

const createProduct = expressAsyncHandler(async (req, res) => {
    try{
        const{ title, price, description, image, tags, category, salesOffer, stock } = req.body;
        const product = new Product({
            title,
            price,
            description,
            image,
            tags,
            category,
            salesOffer,
            stock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: get product by id
//route GET /api/products/:id
//acess Public

const getProductById = expressAsyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

            //sends the product and realted products from that category to client side
        if(product) {
            //get related products
            const relatedProducts = await Product.find({category: product.category,
                _id: {$ne: product._id}})   //this does'nt include ethe product itself
                .limit(4);
            res.json({product, relatedProducts});
        } else{
            res.status(404).json({ message: "Product not found" });
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: get all products
//route GET /api/products/:id
//acess Public

const getProducts = expressAsyncHandler(async (req, res) => {
    try{
        //we start creating the sorting functionality for the front end
        const{ category, search, sort, tag } = req.body;
        const pageSize = 10; // the server will return 10 products per page
        const pageNumber= Number(req.query.pageNumber) || 1; //if no page number is provided it'll give 1

        //sort newest to oldest or oldest to newest
        const order = sort === "newest" ? -1 : sort ==="oldest" ?1 : -1;

        //filter by tags
        const tagFilter = tag ?{tags: { $in: tag } } : {};

        //search by title
        const title = search ?{
            title: { $regex: search,
                     $options: "i" },
        } : {};

        //filter by category
        const categoryFilter=  category ? { category } : {};

        //count total products matching the combined criteria - useful for pagination
        const count= await Product.countDocuments({
            ...title,
            ...categoryFilter,
            ...tagFilter
        });

        //get products
        const products= await Product.find({
            ...title,
            ...categoryFilter,
            ...tagFilter
        })
          .sort({createdAt: order})
          .limit(pageSize)
          .skip(pageSize * (pageNumber - 1));

          //get products with offers
          const offers= await Product.aggregate([
            { $match: {'salesOffer.status': true }}, //filter by status
            { $sample: {size: 10}} //get 10 random products
          ]);

          //send products , page num
          res.json({
            products,
            page: pageNumber,
            pages: Math.ceil(count / pageSize),
            // offers
          })
    } catch(error){
        res.status(400).json({ message: error.message });
    }
});

//desc: update a product
//route PUT /api/products/:id
//acess Private/Admin

const updateProduct = expressAsyncHandler(async (req, res) => {
    try{
        const { title, price, description, images, tags, category, salesOffer, stock } = req.body;

        const product= await Product.findById(req.params.id);

        if(product){
            product.title = title || product.title; // "||" this is making sure that the values are not empty or undefined
            product.price = price || product.price;
            product.description = description || product.description;
            product.images = images || product.images;
            product.tags = tags || product.tags;
            product.category = category || product.category;
            product.salesOffer = salesOffer || product.salesOffer;
            product.stock = stock || product.stock;

            const updatedProduct= await product.save();
            res.json(updatedProduct);
        } else{
            res.status(404).json({message: "Product not found"});
        }

    } catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: delete a product
//route DELETE /api/products
//acess Private/Admin

const deleteProduct = expressAsyncHandler(async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product){
            res.status(201).json({message: "Product deleted"});
        } else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});


//desc: get all the popular product tags
//route GET /api/products/all/tags
//acess Public

const getTags = expressAsyncHandler(async (req, res) => {
        //get most used prduct tags
        const tags = await Product.aggregate([ //aggregate is a monogoDB method to retrieve data based on tags
            { $unwind: "$tags"},    //desconstruct tags array
            { $group: { _id: "$tags", count: { $sum: 1}}},    //group by tags and count
            { $sort: { count: -1}},     //sort in descending so most used tags will be on the top
            { $limit: 10},    //get top 10
            ]);

        //send tags to client
            res.json(tags);
});



export { importProducts, createProduct,getProductById, getProducts, updateProduct, deleteProduct, getTags };

