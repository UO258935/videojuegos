class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.meta, x, y)

        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);

        this.animacion = this.aMover;

        this.vy = 0;

    }


    actualizar (){
        this.animacion.actualizar();
    }
    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
    }




}