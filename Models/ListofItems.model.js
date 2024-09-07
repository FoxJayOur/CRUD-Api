const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LOTSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    barcodeID: {
        type: String,
        required: true
    }
});

const LOT = mongoose.model('lot', LOTSchema);
module.exports = LOT;

