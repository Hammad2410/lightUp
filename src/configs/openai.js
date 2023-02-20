const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

module.exports = openai;