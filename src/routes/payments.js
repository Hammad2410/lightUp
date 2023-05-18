const express = require('express')
const connection = require('../configs/db')
const stripe = require('stripe')('sk_test_51MxcVyJ6mDybK89H2HMpE3Cx5DfV0oQ7jtxFZgum7pLkgB3PYKHqHHxr4cz0g6xQAMmubmLlpmZ1JZ8NKXbzhtCP00NGfKZsSB');
const verifyToken = require('../configs/authorizor')
const paymentRoute = express.Router()


// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

paymentRoute.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.

    const { amount } = req.body

    console.log("Amount: ", amount)


    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-11-15' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: +amount * 100,
        currency: 'pkr',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,

        },
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,

        publishableKey: 'pk_test_51MxcVyJ6mDybK89H8EWDB1sDt68whHSXSPe69Le5q0NDme5Xw5yxpNDjckx2Oyyr4v5PPRNt6cyaSxkczB0Fo1Wg00wDRhOtjH'

    });
});

paymentRoute.post('/confirmPayment', verifyToken, async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.

    try {
        let { words, } = req.body;

        console.log(req.user)
        const updateWords = await connection.query("UPDATE users SET words = words + $1 WHERE id = $2", [+words, req.user.user_id])



        if (updateWords) {

            res.send({
                success: true,
                message: 'Words Updated',
            })
        }

    }
    catch (error) {

        console.warn(error)
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = paymentRoute