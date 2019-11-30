class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.meta, x, y)
        this.animacion = new Animacion(imagenes.enemigo_morado,
            this.ancho, this.alto, 5, 2);
    }

    actualizar (){
        this.animacion.actualizar();

    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
    }


}