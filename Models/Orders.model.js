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
        productType: [
            {
            comment: "",
            }
        ]
        }
    ],
    casherName: {
        type: String,
        required: true,
    }
});

const Orders = mongoose.model('data', OrderSchema);
module.exports = Orders;
