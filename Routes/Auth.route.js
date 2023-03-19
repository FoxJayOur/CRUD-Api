/*
http://localhost:3000
http://localhost:3000/formanaAuth/register
http://localhost:3000/formanaAuth/login
http://localhost:3000/formanaAuth/logout
http://localhost:3000/formanaAuth/refresh-token
http://localhost:3000/formanaAuth/input
http://localhost:3000/formanaAuth/ListOfForms
*/


const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../Models/User.model')
const Data = require('../Models/Data.model')
const Answer = require('../Models/Answer.model')
//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');

// define the routes

// REGISTER USERS
router.post('/input', async (req, res, next) => {
    const data = new Data(req.body)
    const savedData = await data.save()
    
    
    res.send({savedData})
});

router.post('/answer', async (req, res, next) => {
    const answer = new Answer(req.body)
    const savedAnswer = await answer.save()
    
    res.send({savedAnswer})
});

router.get('/ListOfForms', async (req, res, next) => {
    try {
        const FormList = await Data.findOne({title: "TrialPleaseWork"})
        res.send(FormList)
        console.log(FormList)
    } catch (error){
        next(error);
    }

})
/*router.post('/title2', async (req, res, next) => {
    try {
        const FormTitle = JSON.stringify(req.body.wtitle)
        const FormList = await Data.findOne({title: FormTitle})
        res.send(JSON.stringify(FormList.title))
        console.log(FormList.title)
    } catch (error){
        next(error);
    }

})*/
router.post('/title', async (req, res, next) => {
    try {
        const FormTitle = (req.body.wtitle)
        const FormList = await Data.findOne({title: FormTitle})
        res.send(JSON.stringify(FormList))
        console.log(FormList)
    } catch (error){
        next(error);
    }

})
router.post('/register', async (req, res, next) => {
    //console.log(req.body)
    try {

        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User.findOne({email: result.email})
        if (emailExist) 
            throw createError.Conflict(result.email + ' already exists')
    
        // if email doesn't exist, add another user
        const user = new User(result)
        const savedUser = await user.save()

        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        res.send({accessToken, refreshToken})

        //res.send(savedUser)
    } catch (error){
        // if error is comming from Joi
        if (error.isJoi === true) error.status = 422    // 422 Unprocessable Entity
        next(error)

    }
});

router.post('/login', async (req, res, next) => {
    try {
                // find user inside users(Collection)
        const user = await User.findOne({email: req.body.email})
        if(user) {
            
        }
        else if(!user) {throw createError.NotFound("Your credentials did not match our record.")}
        
        const isMatch = await user.isValidPassword(req.body.password)
        if (!isMatch) throw createError.Unauthorized('Please ensure that your credentials are valid.')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
        res.send({ accessToken, refreshToken})
        console.log({ accessToken, refreshToken})  
        //res.send(result)
    } catch (error){
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})



module.exports = router
