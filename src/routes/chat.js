const express = require('express')
const openai = require('.././configs/openai')
const connection = require('../configs/db')
const WordExtractor = require("word-extractor");
const upload = require('../configs/upload');
const extractor = new WordExtractor();

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
            max_tokens: 400,
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

chatRoute.post('/answerQuestion', async (req, res) => {
    try {
        let { question } = req.body;

        // console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            max_tokens: 50,
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

chatRoute.post('/createQuestions', async (req, res) => {
    try {
        let { topic, questions } = req.body;

        // console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Create ${questions} questions from ${topic}`,
            max_tokens: 50,
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

chatRoute.post('/summerize', upload.single('file'), async (req, res) => {
    try {
        let { text, words, url } = req.body;

        // let content = await extractor.extract(req.file.path)

        // console.log(content.getBody())

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Summarize ${text} in ${words} words`,
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

chatRoute.post('/solve', async (req, res) => {
    try {
        let { question } = req.body;

        // console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Solve ${question} step by step`,
            max_tokens: 250,
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

chatRoute.post('/translate', async (req, res) => {
    try {
        let { text, language } = req.body;

        // console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `translate the following "${text}" into ${language}`,
            max_tokens: 500,
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