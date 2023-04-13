const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    questions: [
        {
        question: "",
        comments: [
            {
            comment: "",
            }
        ]
        }
    ],
    questions2: [
        {
        question: "",
        comments: [
            {
            comment: "",
            }
        ],
        comments2: [
            {
            comment: "",
            }
        ]
        }
    ],
    questions3: [
        {
        question: "",
        comments: [
            {
            comment: "",
            }
        ]
        }
    ],
    approvedBy: {
        type: String,
        required: true,
    }
});

const Data3 = mongoose.model('data3', DataSchema);
module.exports = Data3;
