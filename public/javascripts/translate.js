function sendTextToTranslate() {
    //Recupera mensagem digitada pelo usuário
    var textMessage = document.textForm.textMessage.value;
    answer = document.getElementById('answer');

    $.post("/ibmWatson/languageTranslator",
        { text: textMessage },
        //tratamento de sucesso de processamento do post
        function (returnedData, statusRequest) {
            // se ocorreu algum erro no processamento da API
            if (returnedData.status === 'ERRO')
                alert(returnedData.data);
            // caso os dados tenham retornado com sucesso
            else {
                // exibe retorno da API e recupera o contexto para o proximo diálogo
                console.log(returnedData);
                answer.innerHTML = "<div>"+returnedData.data.result.translations[0].translation+" </div>";
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
            sendTextToTranslate();
        }
    }
);

