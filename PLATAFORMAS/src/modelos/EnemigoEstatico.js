class EnemigoEstatico extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y);
        this.animacion = new Animacion(imagenes.enemigo_animacion_morado,
            this.ancho, this.alto, 6, 2);
        this.x=x;

    }
     getX(){
        return this.x;
     }
    actualizar (){
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

}
