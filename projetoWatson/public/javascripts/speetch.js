
function sendTextToSpeech(textMessage) {
    //cria um elemento html de audio para tocar o audio retornado pela API
    var audioElement = document.createElement('audio');
    //especifica o atributo type do audio
    audioElement.setAttribute('type', 'audio/ogg;codecs=opus');
    //define como source do audio o retorno do serviço textToSpeech
    audioElement.setAttribute('src', '/ibmWatson/textToSpeech?text=' + textMessage);
    //toca o audio retornado
    audioElement.play();
}