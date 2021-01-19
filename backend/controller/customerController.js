const Customer = require('../models/Customer');

const getCustomerList = async (req,res) => {
    try {
        console.log("in getCustomerList api");
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.json(error);
    }
}

const getCustomer = async (req,res) => {
    try{
        console.log('in getCustomer api');
        const customer = await Customer.findById(req.params.id);
        res.json(customer);
    }catch(error){
        res.json(error);
    }
}

const addCustomer = async (req,res) => {
    try{
        console.log('in addCustomer api');
        console.log(req.body);
        const newCustomer = new Customer({
            name: req.body.name,
            email: req.body.email
        });
        const customer = await newCustomer.save();
        res.json(customer);
    }catch(error){
        res.json(error);
    }
} 

module.exports = { getCustomerList, getCustomer, addCustomer};