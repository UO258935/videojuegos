var imagenes = {
    jugador : "res/prota-quieto.png",
    jugador_derecha : "res/animacion-prota-quieto-derecha.png",
    jugador_izquierda : "res/animacion-prota-quieto-izquierda.png",
    fondo : "res/fondo.png",
    fondo1 : "res/fondo.png",
    plataforma_izquierda : "res/agua-izquierda.png",
    plataforma_derecha : "res/agua-derecha.png",
    plataforma_centro : "res/agua.png",
    plataforma_izquierda_roja : "res/agua-izquierda-roja.png",
    plataforma_derecha_roja : "res/agua-derecha-roja.png",
    plataforma_centro_roja : "res/agua-roja.png",
    meta : "res/meta.png",
    recolectable : "res/moneda-oro.png",
    disparo : "res/disparo.png",
    salto_derecha : "res/animacion-prota-salto-derecha.png",
    salto_izquierda : "res/animacion-prota-salto-izquierda.png",
    enemigo_movimiento : "res/enemigo-movimiento.png",
    enemigo_muerto : "res/enemigo-muerto.png",
    boton_pausa :  "res/button_pause.png",
    boton_disparar : "res/buttonfire.png",
    pad : "res/pad.png",
    pantalla_carga : "res/pantalla_carga.png",
    pantalla_pausa : "res/pausa.png",
    pantalla_instrucciones : "res/instrucciones.png",
    boton_jugar : "res/jugar.png",
    trampa : "res/trampa.png",



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
