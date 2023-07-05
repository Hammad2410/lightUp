const express = require('express')
const openai = require('.././configs/openai')
const connection = require('../configs/db')
const WordExtractor = require("word-extractor");
const upload = require('../configs/upload');
const extractor = new WordExtractor();
const verifyToken = require('../configs/authorizor');

const chatRoute = express.Router()

chatRoute.get('/getWords', verifyToken, async (req, res) => {
    try {


        const result = await connection.query("SELECT words FROM users WHERE id = $1", [req.user.user_id])

        if (result) {
            // console.log("Working ", result?.data)

            res.send({
                success: true,
                message: 'Response fetched',
                words: result.rows[0].words
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


chatRoute.post('/createQuery', async (req, res) => {
    try {
        let { topic, words, option, level } = req.body;

        console.log(req.body)

        let result = await openai.createCompletion({
            model: "davinci",
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
            model: "davinci",
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
            model: "davinci",
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
            model: "davinci",
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
            model: "davinci",
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
            model: "davinci",
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
            model: "davinci",
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
//             model: "davinci",
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