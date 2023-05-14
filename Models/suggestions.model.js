const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionsSchema = new Schema({
    suggestions: {
        type: String
    }
});

const Suggestions = mongoose.model('suggestions', SuggestionsSchema);
module.exports = Suggestions;
