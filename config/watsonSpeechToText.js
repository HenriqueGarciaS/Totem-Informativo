const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const speechToText = new SpeechToTextV1({
      version: '2019-18-03',
      iam_apikey: 'UOftTdPyQW4VgwkVZxBfd4wj9LYEnpqOV0kKdaU3q-9C',
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
  });
 module.exports = speechToText;