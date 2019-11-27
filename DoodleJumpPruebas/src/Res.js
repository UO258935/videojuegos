var imagenes = {
    jugador : "res/prota-quieto.png",
    jugador_derecha : "res/animacion-prota-quieto-derecha.png",
    jugador_izquierda : "res/animacion-prota-quieto-izquierda.png",
    fondo : "res/fondo.png",
    fondo1 : "res/fondo1.png",
    plataforma_izquierda : "res/agua-izquierda.png",
    plataforma_derecha : "res/agua-derecha.png",
    plataforma_centro : "res/agua.png",
    meta : "res/meta.png",
    recolectable : "res/moneda-oro.png",
    disparo : "res/disparo.png",


};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
