const Order = require('../models/Order');

const getOrderList = async (req,res) => {
    try {
        console.log("in getOrderList api");
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.json(error);
    }
}

const getOrder = async (req,res) => {
    try{
        console.log('in getOrder api');
        const order = await Order.findById(req.params.id);
        res.json(order);
    }catch(error){
        res.json(error);
    }
}

const getOrderByCustomerId = async (req,res) => {
    try{
        console.log('in getOrderByCustomerId api');
        const orders = await Order.find({customerId: req.params.id}).populate("productsOrdered.product");
        res.json(orders);
    }catch(error){
        res.json(error);
    }
}

const addOrder = async (req,res) => {
    try{
        console.log('in addOrder api', req.params.id);
        console.log(req.body);
        const newOrder = new Order({
            customerId: req.params.id,
            status: "Processing",
            productsOrdered: req.body
        })
        const order = await newOrder.save();
        res.json(order);
    }catch(error){
        res.json(error);
    }
} 

const updateOrder = async (req,res) => {
    try{
        console.log('in updateOrder api');
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedJob);
    }catch(err){
        res.json(err);
    }
}

const removeOrder = async (req,res) => {
    try{
        console.log('in removeOrder api');
        // const deletedJob = await Jobs.findOneAndRemove({
        //     'recruiterId': req.params.recruiterId,
        //     'jobs._id': req.params.jobId
        // });
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json(deletedOrder);
    }catch(err){
        res.json(err);
    }
}

module.exports = { getOrderList, getOrder,getOrderByCustomerId, addOrder, updateOrder, removeOrder };