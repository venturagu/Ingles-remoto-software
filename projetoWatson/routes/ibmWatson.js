var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
//recupera configurações de acesso aos serviços IBM Watson
const ibmWatson = require('../lib/ibmWatsonCredentials');

// post para o serviço : IBM Watson Assistant 
router.post('/assistant', function (req, res, next) {
    //recupera mensagem de texto e contexto da conversa
    var { text, contextDialog } = req.body;
    context = JSON.parse(contextDialog);

    //constrói json para envio de dados do serviço
    const params = {
        input: { text },
        workspaceId: '0fec0151-0740-46a7-8132-88920c6ffc56',
        context
    };

    //envia os dados ao serviço e retorna mensagem
    ibmWatson.assistant.message(
        params,
        function (err, response) {
            if (err)
                res.json({ status: 'ERRO', data: err.toString() });
            else
                res.json({ status: 'OK', data: response });
        }
    );
});

router.get('/textToSpeech', async (req, res, next) => {
    try{
        //constrói json para envio dos dados ao serviço
        var params = {
            text: req.query.text,
            accept: 'audio/mp3',
            voice: 'en-US_MichaelVoice'
        };
        //envia os dados ao serviço e armazena o retorno no objeto result
        const {result} = await ibmWatson.textToSpeech.synthesize(params);
        result.on('response', (response) => {
            //disponibiliza audio para o front-end
            response.headers['content-disposition'] = `attachment;
            filename=transcript.audio%2Fmp3`;
        });
        result.on('error', next);
        result.pipe(res);
    }
    catch(error){
        res.send(error);
    }
});

router.post('/speechToText', upload.single('audioFile'), function (req, res, next){
	var audioStream = req.file;
	var params = {
		audio: audioStream.buffer,
		contentType: 'audio/l16; rate=44100',
		interim_results: true,
		model: 'en-US_NarrowbandModel'
	};
	console.log(params);
	
	ibmWatson.speechToText.recognize(params, function (error,response){
		if(error)
			res.json({ status: 'ERRO', data: error.code + ' - ' + error.toString() });
		else {
		console.log(JSON.stringify(response.result, null, 2));
		res.json({ status: 'OK', data: response });
		}
	});
});

// post para o serviço : IBM Watson Language Translator 
router.post('/languageTranslator', function (req, res, next){
	const translateParams = {
        text: req.body.text,
        modelId: 'en-pt',
        source: 'English',
        target: 'Portuguese',
      };
	console.log(translateParams);
    
	ibmWatson.languageTranslatorV3.translate(translateParams, function (error,response){
		if(error)
			res.json({ status: 'ERRO', data: error.code + ' - ' + error.toString() });
		else {
		console.log(JSON.stringify(response.result, null, 2));
		res.json({ status: 'OK', data: response });
		}
	});
});

module.exports = router;