const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LOTSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image_URL: {
        type: String,
        required: true
    },
    barcode_ID: {
        type: String,
        required: true
    }
});

const LOT = mongoose.model('lot', LOTSchema);
module.exports = LOT;

