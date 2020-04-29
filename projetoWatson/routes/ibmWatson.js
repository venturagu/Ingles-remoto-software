var express = require('express');
var router = express.Router();

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

module.exports = router;