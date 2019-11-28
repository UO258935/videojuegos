class DisparoJugador extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo, x,y)
        this.vy = -30;
        this.gravedad = true;
    }

    actualizar(){

    }
}
