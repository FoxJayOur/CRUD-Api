const mongoose = require('mongoose')

// Connect to Database

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to Database..");
})
.catch((err) => console.log(err.message))

// Connecting mongoose to the Database
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
})
mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose connection is disconnected.')
// })
// process.on('SIGINT', async () => {
//     await mongoose.connection.close()
//     process.exit(0)    // stop the app
// })