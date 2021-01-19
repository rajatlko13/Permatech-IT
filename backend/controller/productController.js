const Product = require('../models/Product');

const getProductList = async (req,res) => {
    try {
        console.log("in getProductList api");
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json(error);
    }
}

const getProduct = async (req,res) => {
    try{
        console.log('in getProduct api');
        const product = await Product.findById(req.params.id);
        res.json(product);
    }catch(error){
        res.json(error);
    }
}

const addProduct = async (req,res) => {
    try{
        console.log('in addProduct api');
        console.log(req.body);
        const newProduct = new Product({
            name: req.body.name
        })
        const product = await newProduct.save();
        res.json(product);
    }catch(error){
        res.json(error);
    }
} 

module.exports = { getProductList, getProduct, addProduct };