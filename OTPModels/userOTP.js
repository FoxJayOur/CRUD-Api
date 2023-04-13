const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userOTPVerificationSchema = new Schema({
    userID: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

const OTPVerify = mongoose.model(
    "OTPVerify",
    userOTPVerificationSchema
);

module.exports = OTPVerify;