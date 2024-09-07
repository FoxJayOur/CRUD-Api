/*
http://localhost:8080
http://localhost:8080/Auth/register
http://localhost:8080/Auth/login
http://localhost:8080/Auth/logout
http://localhost:8080/Auth/refresh-token
http://localhost:8080/Auth/input
http://localhost:8080/Auth/ListOfForms
*/

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const LOT = require('../Models/ListofItems.model')
//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');

router.post('/addItem', async (req, res, next) => {
    const itemExist = await LOT.findOne({name: req.body.name})
    if(itemExist) {
        console.log("Order already exists")
    }
    else {
        const lot = new LOT(req.body)
        const savedLOT = await lot.save()
        
        res.send({savedLOT})
    }
});
router.post('/deleteItem', async (req, res, next) =>  {
    try {
        const deleteItem = await LOT.deleteOne({name: req.body.name});
        console.log(deleteItem)
        res.send({deleteItem})
    } catch (error){
        next(error)
        res.send("Item not found")
    }
})
router.post('/viewListOfItems', async (req, res, next) =>  {
    try {
        const lot = await LOT.find({name: req.body.name});
        console.log(lot)
        res.send({lot})
    } catch (error){
        next(error);
        res.send("Item not found")
    }

})
/*
router.post('/items', async (req, res, next) => {
    try {
        const FormTitle = (req.body.wtitle)
        const FormList = await LOT.findOne({title: FormTitle})
        res.send(JSON.stringify(FormList))
        console.log(FormList)
    } catch (error){
        next(error);
    }

})
*/
router.get('/viewAll', async (req, res, next) =>  {
    const itemsDataAll = await LOT.find({})
    res.send({itemsDataAll})

})

module.exports = router