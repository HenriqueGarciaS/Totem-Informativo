var context = '{}';
var str = "null";

function enviarMensagem() {
  // recupera mensagem digitada pelo usuário e exibe na tela
  var texto = document.chatForm.texto.value;

  console.log("passou aqui enviar msg");
  chat = document.getElementById('chat');
  chat.innerHTML += "<br>" + texto + "<br><br>";
  // cria objeto para envio para a API
  var input = {
    text: texto,
    context
  };
  // post para o serviço criado
  $.ajax({
    url: 'watsonAssistant',
    type: 'post',
    data: input,
    // tratamento de erro do post
    error: function (dados) {
      alert('Erro: ' + dados.data);
    },
    // tratamento de sucesso de processamento do post
    success: function (dados) {
      // se ocorreu algum erro no processamento da API
      if (dados.status === 'ERRO') // compara apenas o valor e não o objeto como um todo '==='
        alert('Erro: ' + dados.data);
      // caso os dados tenham retornado com sucesso
      else {
        // exibe retorno da API e recupera o contexto para o próximo diálogo
        chat.innerHTML += dados.data.output.text + "<br>";
        str = dados.data.output.text;
        console.log(str);
        context = JSON.stringify(dados.data.context);

        // post para o serviço watsonTextToSpeech
        /*$.ajax({
            url: 'watsonTextToSpeech',
            type: 'post',
            data: {texto: JSON.stringify(dados.data.output.text)},
            // tratamento de erro do post
            error: function (dados) {
                alert('Erro: ' + dados.data);
            },
            // tratamento de sucesso de processamento do post
            success: function (dados) {
                // se ocorreu algum erro no processamento da API
                if (dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                // caso os dados tenham retornado com sucesso
                else {
                    // play no audio retornado
                    var audioElement = document.createElement('audio');
                    audioElement.setAttribute('src', 'audio/audioWatson.wav');
                    audioElement.play();
                    // ao finalizar o audio, seta o atributo para vazio (evita cache)
                    audioElement.addEventListener('ended', function(){
                        audioElement.currentTime = 0;
                        audioElement.setAttribute('src', '');
                    });
                }
            }
        });*/
      }
    }
  });
}
