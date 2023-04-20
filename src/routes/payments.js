const express = require('express')
const connection = require('../configs/db')
const md5 = require('md5')
const jwt = require("jsonwebtoken");
const stripe = require('stripe')('sk_test_51MxcVyJ6mDybK89H2HMpE3Cx5DfV0oQ7jtxFZgum7pLkgB3PYKHqHHxr4cz0g6xQAMmubmLlpmZ1JZ8NKXbzhtCP00NGfKZsSB');

const paymentRoute = express.Router()


// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

paymentRoute.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-11-15' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 14000,
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

module.exports = paymentRoute