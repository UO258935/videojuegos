
var musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;

var efectos = {
    disparo : "res/disparo.mp3",
    salto : "res/salto.mp3",
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}
