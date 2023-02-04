const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    questions: [
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
