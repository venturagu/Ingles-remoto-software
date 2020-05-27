const uploadForm = document.querySelector('upload');
answer = document.getElementById('answer');

function sendFileToRecognition(){
   let file = document.getElementById('file');
   console.log(file.files[0]);

   let formData = new FormData()
   formData.append('file', file.files[0])
   $.ajax({
    url: '/ibmWatson/visualRecognition',
    type: 'post',
    data: formData,
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
            if(returnedData.data.result.images[0] != undefined) {
                console.log(returnedData);
                answer.innerHTML += "<div>"+returnedData.data.result.images[0].classifiers[0].classes[0].class+" </div>";
                answer.innerHTML += "<div>"+returnedData.data.result.images[0].classifiers[0].classes[1].class+" </div>";
                answer.innerHTML += "<div>"+returnedData.data.result.images[0].classifiers[0].classes[2].class+" </div>";
            }
        }
    }
});

}
$(document).ready(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
            sendFileToRecognition();
        }
});