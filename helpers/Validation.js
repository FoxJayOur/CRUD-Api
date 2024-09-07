const Joi = require('joi');

// for register schema
const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
});

// export Schema

module.exports = {
    authSchema
}
