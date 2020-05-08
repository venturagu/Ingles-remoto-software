//variável para controlar o contexto do dialogo
var contextDialog = '{}';

function sendMessageToAssistant() {
    //Recupera mensagem digitada pelo usuário
    var textMessage = document.chatForm.textMessage.value;
    chat = document.getElementById('chat');

    //na primeira chamada (boas vindas) textMessage é undefined
    //então define como vazio para ar erro na API

    if (textMessage === undefined || textMessage === '')
        textMessage = '';
    else //exibe a mensagem na tela
        chat.innerHTML += 'You -->' + textMessage + '<br>';

    //limpa o campo input;
    document.chatForm.textMessage.value = '';

    $.post("/ibmWatson/assistant",
        { text: textMessage, contextDialog },
        //tratamento de sucesso de processamento do post
        function (returnedData, statusRequest) {
            // se ocorreu algum erro no processamento da API
            if (returnedData.status === 'ERRO')
                alert(returnedData.data);
            // caso os dados tenham retornado com sucesso
            else {
                // exibe retorno da API e recupera o contexto para o proximo diálogo
                chat.innerHTML += 'Teacher --> ' + returnedData.data.result.output.text + '<br>';
                contextDialog = JSON.stringify(returnedData.data.result.context);
            }
        }

    )
        //tratamento de erro do post
        .fail(function (returnedData) {
            alert('Erro: ' + returnedData.status + '' + returnedData.statusText);
        });
}

//Envia mensagem quando o usuario precionar enter
$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
            sendMessageToAssistant();
        }
    }
);

//após carregar todos os recurso da página, faz post para o serviço
// para exibir mensagem de boas vidas do chat
$(document).ready(function () {
    sendMessageToAssistant();
});