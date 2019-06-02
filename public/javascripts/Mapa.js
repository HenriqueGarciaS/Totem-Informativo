function desenharMapa(){
    try{
    var escolha = document.getElementById("escolha").value;
    escolha = escolha.toUpperCase();
    switch(escolha){
    case "LUGAR":
        var ifr = document.createElement("iframe");
    var lugar = document.getElementById("texto").value;
    var lugarFormatado = lugar.replace(' ','+');
    ifr.setAttribute("width","600");
    ifr.setAttribute("height","450");
    ifr.setAttribute("frameborder","0");
    ifr.setAttribute("style","border:0");
    ifr.setAttribute("src","https://www.google.com/maps/embed/v1/place?q="+lugarFormatado+"&key=");
    document.body.appendChild(ifr);
    break;
    case "LOJAS":
    var ifr = document.createElement("iframe");
    var lugar = document.getElementById("texto").value;
    var lugarFormatado = lugar.replace(' ','+');
    ifr.setAttribute("width","600");
        ifr.setAttribute("height","450");
        ifr.setAttribute("frameborder","0");
        ifr.setAttribute("style","border:0");
        ifr.setAttribute("src","https://www.google.com/maps/embed/v1/search?q=shops+near+"+lugarFormatado+"&key=");
        document.body.appendChild(ifr);
        break;
    case "ONIBUS":
        var ifr = document.createElement("iframe");
        var lugar = document.getElementById("texto").value;
        var lugarFormatado = lugar.replace(' ','+');
        ifr.setAttribute("width","600");
        ifr.setAttribute("height","450");
        ifr.setAttribute("frameborder","0");
        ifr.setAttribute("style","border:0");
        ifr.setAttribute("src","https://www.google.com/maps/embed/v1/search?q=bus+stop+near+"+lugarFormatado+"&key=");
        document.body.appendChild(ifr);
        break;
    case "DESTINO":
        var ifr = document.createElement("iframe");
        var lugar = document.getElementById("texto").value;
        var lugarFormatado = lugar.replace(' ','+');
        ifr.setAttribute("width","600");
        ifr.setAttribute("height","450");
        ifr.setAttribute("frameborder","0");
        ifr.setAttribute("style","border:0");
        ifr.setAttribute("src","https://www.google.com/maps/embed/v1/directions?origin=puc+campinas&destination="+lugarFormatado+"&key=");
        document.body.appendChild(ifr);
        break;
}
    }
    catch(err)
    {
        alert("algum erro aconteceu");
    }
   
}