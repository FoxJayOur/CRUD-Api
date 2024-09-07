const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    }
});


// to create user from UserSchema
const Token = mongoose.model('tokens', TokenSchema);
module.exports = Token;