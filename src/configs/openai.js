const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

module.exports = openai;