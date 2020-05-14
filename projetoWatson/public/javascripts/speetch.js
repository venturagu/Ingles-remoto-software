
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

function sendAudioToSpeechToText(blob) {
	var form = new FormData();
	form.append('audioFile', blob);
	$.ajax({
		url: '/ibmWatson/speechToText',
		type: 'post',
		data: form,
		processData: false,
		contentType: false,
		error: function (returnedData) {
			alert('Erro2: ' + returnedData.status + ' ' + returnedData.statusText);
		},
		success: function (returnedData) {
			console.log(returnedData);
			if(returnedData.status === 'ERRO')
				alert('Erro3: ' + returnedData.data);
			else {
				if(returnedData.data.result.results[0] != undefined) {
					var retorno = JSON.stringify(returnedData.data.result.results[0].alternatives[0].transcript).replace(/"/g, '');
					document.getElementById("textBox").value = retorno;
				}
			}
		}
	});
}
