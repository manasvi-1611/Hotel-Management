const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'completed'
    }
});

module.exports = mongoose.model('Order', orderSchema); 