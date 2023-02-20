const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

module.exports = openai;