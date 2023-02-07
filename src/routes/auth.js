const express = require('express')
const connection = require('../configs/db')
const md5 = require('md5')
const jwt = require("jsonwebtoken");

const authRoute = express.Router()

authRoute.post('/signUp', async (req, res) => {
    try {
        let { first_name, last_name, email, password } = req.body

        const users = await connection.query("SELECT * FROM users WHERE email = $1 ", [email])

        if (users.rows.length == 0) {

            const salt = await md5(Date.now())

            const pass = await md5(password + salt)

            const insertUser = await connection.query("INSERT INTO users(first_name, last_name, email, created_at, password, salt) VALUES( $1, $2, $3, $4, $5, $6)",
                [first_name, last_name, email, Date.now(), pass, salt]
            )

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

module.exports = authRoute;