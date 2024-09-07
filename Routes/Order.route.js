/*
http://localhost:8080
http://localhost:8080/Auth/register
http://localhost:8080/Auth/login
http://localhost:8080/Auth/logout
http://localhost:8080/Auth/refresh-token
http://localhost:8080/Auth/input
http://localhost:8080/Auth/ListOfForms
*/

const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const Orders = require('../Models/Orders.model')

//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');

router.post('/addOrder', async (req, res, next) => {
    
    const orderExist = await Orders.findOne({title: req.body.title})
    if(orderExist) {
        console.log("Order already exists")
    }
    else {
        const order = new Orders(req.body)
        const savedOrder = await order.save()

        res.send({savedOrder})
    }
    
});
router.post('/deleteOrder', async (req, res, next) =>  {
    try {
        const deleteOrder = await Orders.deleteOne({title: req.body.nameTitle});
        console.log(deleteOrder)
        res.send({deleteOrder})
    } catch (error){
        next(error);
    }
})
router.get('/viewAll', async (req, res, next) =>  {
    const orderDataAll = await Orders.find({})
    res.send({orderDataAll})

})

module.exports = router