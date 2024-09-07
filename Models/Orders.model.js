const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    items: [
        {
        item: "",
        productTypes: [
            {
            productType: "",
            },
            {
            price: Number,
            }
        ],
        }
    ],
    cashierName: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
});

const Orders = mongoose.model('orders', OrderSchema);
module.exports = Orders;
