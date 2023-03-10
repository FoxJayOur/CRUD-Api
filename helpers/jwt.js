// JWT, or JSON Web Token, is an open standard used to share information between two parties securely — a client and a server
// After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. 
// This token tells the server what routes, services, and resources the user is allowed to access.

// https://www.npmjs.com/package/jsonwebtoken#jsonwebtokenerror



const JWT = require('jsonwebtoken')
const createError = require('http-errors')

// export functions
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "1h",
                issuer: 'http://localhost:8100',      //Issuer takes ANY string
                audience: userId,          // audience of this token
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(createError.InternalServerError())
                }
                   
               return resolve(token)  
            })
        })
    },
        


    // Middleware
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
            const authHeader = req.headers['authorization']
            const bearerToken = authHeader.split(' ')
            const token = bearerToken[1]
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    // if (err.name === 'JsonWebTokenError') {
                    //     return next(createError.Unauthorized())
                    // } else {
                    //     return next(createError.Unauthorized(err.message))
                    // }
                    // alternate code
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return next(createError.Unauthorized(message))
                }
                // if there's no error
                req.payload = payload
                next()
            })
},




signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: "1y",
            issuer: 'formana.com',      //Issuer takes ANY string
            audience: userId,          // audience of this token
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                return reject(createError.InternalServerError())
            }
               
           return resolve(token)  
        })
    })
},


verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(createError.Unauthorized())
            const userId = payload.aud

            resolve(userId)
        })
    })

}
}
