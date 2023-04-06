const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    title: "",
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
    ]
});

const Answer = mongoose.model('answer', AnswerSchema);
module.exports = Answer;

