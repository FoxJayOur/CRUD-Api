const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    /*
    isAdmin: {
        type: Boolean,
        required: true
    },
    */
    createdAt: {
        type: Date,
        immutablee: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }

});

// called after saving a user
// use function and remove => to use .this
UserSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
        } catch (error) {
        next(error)
    }

})

UserSchema.methods.isValidPassword = async function (password) {
    try{
       return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


// to create user from UserSchema
const User2 = mongoose.model('user2', UserSchema);
module.exports = User2;





// try{
//     Department.insertMany([
//         {
//             "deptName": "CICS",
//             "program": {
//                 "progName":  "Bachelor of Science in Computer Science (BSCS)"
//             }  
//         },
//         {
//             "deptName": "CICS",
//             "program": {
//                 "progName":  "Bachelor of Science in Information Technology (BS IT)"
//             }
//         }
//     ])                                                                  

// } catch (error){
//     next(error);
// }
