const express = require('express')
const connection = require('../configs/db')
const md5 = require('md5')
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
require('dotenv').config();

const authRoute = express.Router()

authRoute.post('/signUp', async (req, res) => {
    try {
        let { first_name, last_name, email, password, phone } = req.body

        if (email && password && phone) {
            const users = await connection.query("SELECT * FROM users WHERE email = $1 ", [email])

            if (users.rows.length == 0) {

                const salt = await md5(Date.now())

                const otp = generateRandomNumber(100000, 999999)

                const pass = await md5(password + salt)

                const insertUser = await connection.query("INSERT INTO users(first_name, last_name, email, created_at, password, salt, otp, phone) VALUES( $1, $2, $3, $4, $5, $6, $7, $8)",
                    [first_name, last_name, email, Date.now(), pass, salt, otp, phone]
                )

                sendOTP(phone, otp)

                res.send({
                    success: true,
                    message: "User Registered",
                });

            }
            else {

                res.send({
                    success: false,
                    message: "Email Already exist",
                });
            }
        }
        else {
            res.send({
                success: false,
                message: "Missing Fields"
            })
        }

    }
    catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

authRoute.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body

        const users = await connection.query("SELECT * FROM users WHERE email = $1 AND password = md5(concat($2 || salt))", [email, password])

        if (users.rows.length > 0) {
            let token = jwt.sign({ user_id: users.rows[0].id, email: users.rows[0].email }, "jwttokensecret", {
                expiresIn: '1h'
            })
            res.send({
                success: true,
                message: "User Registered",
                token: token
            });

        }
        else {
            res.send({
                success: false,
                message: "Invalid email or password",
            });
        }


    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

authRoute.post('/verifyNumber', async (req, res) => {
    try {
        let { email, otp } = req.body

        const users = await connection.query("SELECT * FROM users WHERE email = $1 AND otp = $2", [email, otp])

        if (users.rows.length > 0) {
            const activateUser = await connection.query("UPDATE users SET status = 'verified' WHERE email = $1", [email])

            if (activateUser) {
                res.send({
                    success: true,
                    message: "User Verified"
                })
            }

        }
        else {
            res.send({
                success: false,
                message: "Invalid code",
            });
        }
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

authRoute.post('/forgotPassword', async (req, res) => {
    try {
        let { email } = req.body

        const users = await connection.query("SELECT * FROM users WHERE email = $1", [email])

        if (users.rows.length > 0) {

            const otp = generateRandomNumber(100000, 999999)

            const updateUser = await connection.query("UPDATE users SET otp = $2 WHERE email = $1", [email, otp])

            sendOTP(users.rows[0].phone, otp)

            res.send({
                success: true,
                message: "Verification code sent",
            });

        }
        else {
            res.send({
                success: false,
                message: "Invalid email",
            });
        }


    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

authRoute.post('/resetPassword', async (req, res) => {
    try {
        let { email, password } = req.body

        const users = await connection.query("UPDATE users SET password = md5(concat($2 || salt)) WHERE email = $1", [email, password])

        if (users) {
            res.send({
                success: true,
                message: "Password Reset",
            });
        }
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});



function sendOTP(number, otp) {
    // var mobileNo = "+923355466610";
    // var OTP = generateRandomNumber(1000, 9999);

    var params = {
        Message: "Your mobile verification code is: " + otp, /* required */
        PhoneNumber: number,
    };
    return new AWS.SNS({ apiVersion: '2010–03–31' })
        .publish(params)
        .promise()
        .then(message => {
            console.log("OTP SEND SUCCESS");
        })
        .catch(err => {
            console.log("Error " + err)
            return err;
        });
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = authRoute;