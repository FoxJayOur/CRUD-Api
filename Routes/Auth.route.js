/*
http://localhost:3000
http://localhost:3000/formanaAuth/register
http://localhost:3000/formanaAuth/login
http://localhost:3000/formanaAuth/logout
http://localhost:3000/formanaAuth/refresh-token
http://localhost:3000/formanaAuth/input
http://localhost:3000/formanaAuth/ListOfForms
*/

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../Models/User.model')
const User2 = require('../Models/User2.model')
const Data = require('../Models/Data.model')
const Data2 = require('../Models/Data2.model')
const Data3 = require('../Models/Data3.model')
const Answer = require('../Models/Answer.model')
const Answer2 = require('../Models/Answer2.model')
const Answer3 = require('../Models/Answer3.model')
const OTPVerify = require('../OTPModels/userOTP')
const Suggestions = require('../Models/suggestions.model')
//const {authSchema, loginSchema} = require('../helpers/Validation');
const {authSchema} = require('../helpers/Validation');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt');

// define the routes
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
router.post('/addSuggestions', async (req, res, next) =>  {
    const suggestions = new Suggestions(req.body)
    const savedSuggestions = await suggestions.save()

    res.send({savedSuggestions})
})
router.get('/viewAll', async (req, res, next) =>  {
    const formDataAll = await Data.find({})
    const formData2All = await Data2.find({})
    const formData3All = await Data3.find({})
    res.send({formDataAll, formData2All, formData3All})

})
router.post('/deleteDocument', async (req, res, next) =>  {
    try {
        const deleteDocs = await Data.deleteOne({title: req.body.nameTitle});
        console.log(deleteDocs)
        res.send({deleteDocs})
    } catch (error){
        next(error);
    }

})
router.post('/deleteDocument2', async (req, res, next) =>  {
    try {
        const deleteDocs = await Data2.deleteOne({title: req.body.nameTitle});
        console.log(deleteDocs)
        res.send({deleteDocs})
    } catch (error){
        next(error);
    }

})
router.post('/deleteDocument3', async (req, res, next) =>  {
    try {
        const deleteDocs = await Data3.deleteOne({title: req.body.nameTitle});
        console.log(deleteDocs)
        res.send({deleteDocs})
    } catch (error){
        next(error);
    }

})
// REGISTER USERS
router.post('/input', async (req, res, next) => {
    
    const formExist = await Data.findOne({title: req.body.title})
    if(formExist) {
        console.log("Form already exists")
    }
    else {
        const data = new Data(req.body)
        const savedData = await data.save()

        res.send({savedData})
    }
    
});
router.post('/input2', async (req, res, next) => {
    
    const formExist = await Data2.findOne({title: req.body.title})
    if(formExist) {
        console.log("Form already exists")
    }
    else {
        const data2 = new Data2(req.body)
        const savedData = await data2.save()

        res.send({savedData})
    }
    
});
router.post('/input3', async (req, res, next) => {
    
    const formExist = await Data3.findOne({title: req.body.title})
    if(formExist) {
        console.log("Form already exists")
    }
    else {
        const data3 = new Data3(req.body)
        const savedData = await data3.save()

        res.send({savedData})
    }
});

router.post('/answer', async (req, res, next) => {
    const answer = new Answer(req.body)
    const savedAnswer = await answer.save()
    
    res.send({savedAnswer})
});
router.post('/answer2', async (req, res, next) => {
    const answer2 = new Answer2(req.body)
    const savedAnswer = await answer2.save()
    
    res.send({savedAnswer})
});
router.post('/answer3', async (req, res, next) => {
    const answer3 = new Answer3(req.body)
    const savedAnswer = await answer3.save()
    
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
router.post('/title2', async (req, res, next) => {
    try {
        const FormTitle = (req.body.wtitle)
        const FormList = await Data2.findOne({title: FormTitle})
        res.send(JSON.stringify(FormList))
        console.log(FormList)
    } catch (error){
        next(error);
    }

})
router.post('/title3', async (req, res, next) => {
    try {
        const FormTitle = (req.body.wtitle)
        const FormList = await Data3.findOne({title: FormTitle})
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
router.post('/register2', async (req, res, next) => {
    //console.log(req.body)
    try {

        // validating req.body using authSchema (Joi)
        const result = await authSchema.validateAsync(req.body)

        const emailExist = await User2.findOne({email: result.email})
        if (emailExist) 
            throw createError.Conflict(result.email + ' already exists')
    
        // if email doesn't exist, add another user
        const user = new User2(result)
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
router.post('/login2', async (req, res, next) => {
    try {
                // find user inside users(Collection)
        const user = await User2.findOne({email: req.body.email})
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

router.post('/formNotif', async (req, res, next) => {
    sendOTPVerify(req.body, res);
})

router.post('/verifyOTP', async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error("OTP Null Error");
        }
        else {
            const UserOTPVerRec = await OTPVerify.find({
                _id: userId
            });
            await new Promise(f => setTimeout(f, 3000));
            console.log(UserOTPVerRec)
            if (UserOTPVerRec.length <= 0) {
                throw new Error (
                    "Account record does not exist or it has been verified already."
                );
            }
            else {
                const {expiresAt} = UserOTPVerRec[0];
                const hashedOTP = UserOTPVerRec[0].otp;

                if (expiresAt < Date.now()) {
                    await OTPVerify.deleteMany({userId});
                    throw new Error("Code expired, request otp again");
                }
                else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);

                    if (!validOTP) {
                        throw new Error("Invalid code, check email!");
                    }
                    else {
                        await User.updateOne({_id: userId}, {verified: true});
                        await OTPVerify.deleteMany ({userId});
                        res.json({
                            status: "VERIFIED",
                            message: "Your user email has been verified, you may now use Formana!",
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
})

const sendOTPVerify = async ({_id, email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
       
        const mailOptions = {
            from: "BatStateU - Forms Handler",
            to: email,
            subject: "Verify email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration process</p>
            <p>This code <b>expires in 1 hour</b></p>`,
        };

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerify = await new OTPVerify ({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 360000,
        });

        const getUserId = await newOTPVerify.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            data: {
                userId: _id,
                email, 
            },
            getUserId
        })

    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
}


module.exports = router
