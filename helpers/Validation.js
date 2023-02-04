const Joi = require('joi');

// for register schema
const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    srcode: Joi.number().required(),
    isAdmin: Joi.boolean().required(),
    department: Joi.any()

});

// export Schema

module.exports = {
    authSchema
}
