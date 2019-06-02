var context = '{}';
var str = "aaaaabbbb";

console.log('aaaaaaaaaaaaaa eeee');

function controleDefuncoes() {
    console.log("passou aqui controle func");
   if(document.getElementById("texto").value.toUpperCase()==="ONIBUS" ||document.getElementById("texto").value.toUpperCase()==="LOJAS")
     enviarMensagem();
   else if(document.getElementById("texto").value.toUpperCase()==="ENDEREÇO")
     enviarMensagem();
    else
     desenharMapa();
  
  }

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
        str = dados.data.output.text.toString();
        console.log(str);
        var escolha = document.getElementById("texto").value;
        escolha = escolha.toUpperCase();
        if(escolha==="ONIBUS"|| escolha==="LOJAS")
        desenharMapa();
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


function desenharMapa() {
    console.log("passou aqui");
  try {
    switch (str) {
      case "LUGAR":
        var ifr = document.createElement("iframe");
        var lugar = document.getElementById("texto").value;
        var lugarFormatado = lugar.replace(' ', '+');
        console.log("criou o iframe");
        ifr.setAttribute("width", "600");
        ifr.setAttribute("height", "450");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("style", "border:0");
        ifr.setAttribute("src", "https://www.google.com/maps/embed/v1/place?q=" + lugarFormatado + "&key=");
        console.log("tentando dar append");
        document.getElementById("chat").appendChild(ifr);
        break;
      case "Aqui estão as lojas próximas de você!":
        var ifr = document.createElement("iframe");
        var lugar = 'puc campinas';
        var lugarFormatado = lugar.replace(' ', '+');
        console.log("criou o iframe");
        ifr.setAttribute("width", "600");
        ifr.setAttribute("height", "450");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("style", "border:0");
        ifr.setAttribute("src", "https://www.google.com/maps/embed/v1/search?q=shops+near+" + lugarFormatado + "&key=");
        console.log("tentando dar append");
        document.getElementById("chat").appendChild(ifr);
        break;
      case "Aqui está o mapa dos pontos de ônibus próximos.":
        var ifr = document.createElement("iframe");
        var lugar = 'puc campinas';
        var lugarFormatado = lugar.replace(' ', '+');
        console.log("criou o iframe");
        ifr.setAttribute("width", "600");
        ifr.setAttribute("height", "450");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("style", "border:0");
        ifr.setAttribute("src", "https://www.google.com/maps/embed/v1/search?q=bus+stop+near+" + lugarFormatado + "&key=");
        document.getElementById("chat").appendChild(ifr);
        console.log("tentando dar append");
        break;
      case "Digite o nome da rua ou endereço:":
        var ifr = document.createElement("iframe");
        var lugar = document.getElementById("texto").value;
        var lugarFormatado = lugar.replace(' ', '+');
        console.log("criou o iframe");
        ifr.setAttribute("width", "600");
        ifr.setAttribute("height", "450");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("style", "border:0");
        ifr.setAttribute("src", "https://www.google.com/maps/embed/v1/directions?origin=puc+campinas&destination=" + lugarFormatado + "&key=");
        document.getElementById("chat").appendChild(ifr);
        break;
    }
  }
  catch (err) {
    alert("algum erro aconteceu");
  }
}

function converterVozParaTexto(blob) {
  // criar um formulário para enviar o arquivo de audio
  var fd = new FormData();
  fd.append('audioFile', blob);
  // post para o serviço watsonSpeechToText
  $.ajax({
      url: 'watsonSpeechToText',
      type: 'post',
      data: fd,
      processData: false,
      contentType: false,
      // tratamento de erro do post
      error: function (dados) {
          alert('Erro: ' + dados.responseText);
      },
      // tratamento de sucesso de processamento do post
      success: function (dados) {
          // se ocorreu algum erro no processamento da API
          if (dados.status === 'ERRO')
              alert('Erro: ' + dados.data);
          // caso os dados tenham retornado com sucesso
          else {
              // recupera a conversão do audio em texto
              var retorno = JSON.stringify(dados.data.results[0].alternatives[0].transcript).replace(/"/g, '');
              // envia o texto do audio para obter o retorno do chat
              enviarMensagemdevoz(retorno);
          }
      }
  });

  function enviarMensagemdevoz(texto) {
    // recupera mensagem digitada pelo usuário
    if (texto === null)
        texto = document.chatForm.texto.value;

    // exibe mensagem na tela
    chat = document.getElementById('chat');
    chat.innerHTML += texto + '<br>';

    // cria objeto para envio para a API
    var input = {
        text: texto,
        watsonAssistantContext
    };

    // post para o serviço watsonAssistant
    $.ajax({
        url: 'watsonAssistant',
        type: 'post',
        data: input,
        // tratamento de erro do post
        error: function (dados) {
            console.log('Erro: ' + dados.responseText);
            alert('Erro no processamento da API watsonAssistant');
        },
        // tratamento de sucesso de processamento do post
        success: function (dados) {
            // se ocorreu algum erro no processamento da API
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            // caso os dados tenham retornado com sucesso
            else {
                // exibe retorno da API e recupera o contexto para o próximo diálogo
                chat.innerHTML += dados.data.output.text + '<br>';
                watsonAssistantContext = JSON.stringify(dados.data.context);
                str = dados.data.output.text.toString();
                console.log(str);
                desenharMapa();
                context = JSON.stringify(dados.data.context);
                // post para o serviço watsonTextToSpeech
              /*$.ajax({
                    url: 'watsonTextToSpeech',
                    type: 'post',
                    data: { texto: JSON.stringify(dados.data.output.text) },
                    // tratamento de erro do post
                    error: function (dados) {
                        console.log('Erro: ' + dados.responseText);
                        alert('Erro no processamento da API watsonTextToSpeech');
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
                            audioElement.addEventListener('ended', function () {
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
}       

