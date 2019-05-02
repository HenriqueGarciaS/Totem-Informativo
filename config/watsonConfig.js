const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonConfig = new AssistantV1 ({
    version: '2019-18-03',
    username: 'apikey',
    password: 'l54qa9Yk8d-759ZZa8hQjpLWxQ97CXQQhTdNjyIxpHAO',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

module.exports = watsonConfig;