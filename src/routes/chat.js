const express = require('express')
const openai = require('.././configs/openai')
const connection = require('../configs/db')

const chatRoute = express.Router()

chatRoute.post('/createQuery', async (req, res) => {
    try {
        let { topic, words, option, level } = req.body;

        console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write ${option} on ${topic} of ${words} words for ${level} level Response`,
            max_tokens: +words,
            temperature: 0,
        });


        if (result) {
            // console.log("Working ", result?.data)

            res.send({
                success: true,
                message: 'Response fetched',
                result: result?.data?.choices[0]?.text
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

})

chatRoute.post('/createTest', async (req, res) => {
    try {
        let { topic, level, mcqs, short, long } = req.body;

        // console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Generate ${mcqs} MCQs, ${short} short questions and ${long} long questions from ${topic} for ${level} level`,
            max_tokens: +words,
            temperature: 0,
        });


        if (result) {
            console.log("Working ", result?.data)

            res.send({
                success: true,
                message: 'Response fetched',
                result: result?.data?.choices[0]?.text
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

})

// chatRoute.post('/createTest', async (req, res) => {
//     try {
//         let { topic, words } = req.body;

//         // console.log(req.body)

//         let result = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: "Write a short questions and answers on " + topic,
//             max_tokens: +words,
//             temperature: 0,
//         });


//         if (result) {
//             console.log("Working ", result?.data)

//             res.send({
//                 success: true,
//                 message: 'Response fetched',
//                 result: result?.data?.choices[0]?.text
//             })
//         }



//     }
//     catch (error) {

//         console.warn(error)
//         res.send({
//             success: false,
//             message: error.message
//         })
//     }

// })




module.exports = chatRoute;