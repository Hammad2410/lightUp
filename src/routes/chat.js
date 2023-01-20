const express = require('express')
const openai = require('.././configs/openai')

const chatRoute = express.Router()

chatRoute.post('/createEssay', async (req, res) => {
    try {
        let { topic, words } = req.body;

        console.log(req.body)

        let result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Write a essay on " + topic,
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



module.exports = chatRoute;