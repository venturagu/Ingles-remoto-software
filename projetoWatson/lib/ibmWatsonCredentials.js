const AssistantV1 = require('ibm-watson/assistant/v1');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

//configuração para IBM-Watson Assistsnt
const assistant = new AssistantV1({
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2020-01-04',
    authenticator: new IamAuthenticator({ apikey: 'BMWXLNMecMjY-tIoBIY61bjmGRQi1PNneNhVwh3HX8wt'})
}); 
//configuração para o IBM Watson Text to Speech
const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({apikey: 'o6DFad_6gcFjYNzsW9-77LDZNRMcBXX1Rl-g4UE9wYyV'}),
    url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

module.exports = {assistant, textToSpeech};