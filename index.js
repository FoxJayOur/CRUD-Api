/* MODULES
npm install express 
            morgan   | morgan logs the request inside the console
            htt-errors
            dotenv 
            nodemon
            mongoose
            bcrypt
            jsonwebtoken
   SET PORT
   sET PORT=
*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/DB');
const { verifyAccessToken } = require('./helpers/jwt');

const AuthRoute = require('./Routes/Auth.route');

// initialize the app
const app = express();
app.use(cors())
app.use(morgan('dev'))   // using  morgan module

// parse the request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// use verifyAcessToken as a middleware of Access Token
// we provide the access token in the request header
app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send("Hellooooooooo");
})



// route | link
app.use('/api/formanaAuth', AuthRoute);

// all the routes that is not handle, will be handle by this code
app.use(async(req, res, next) => {
    next(createError.NotFound('route does not exist'))    
});
// ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT);
})