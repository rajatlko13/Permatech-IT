const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    status: {
        type: String
    },
    productsOrdered: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantityOrdered: {
            type: Number
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);