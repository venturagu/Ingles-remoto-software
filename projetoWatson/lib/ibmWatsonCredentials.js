const AssistantV1 = require('ibm-watson/assistant/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

//configuração para IBM-Watson Assistsnt
const assistant = new AssistantV1({
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2020-01-04',
    authenticator: new IamAuthenticator({ apikey: 'BMWXLNMecMjY-tIoBIY61bjmGRQi1PNneNhVwh3HX8wt'})
}); 

module.exports = {assistant};