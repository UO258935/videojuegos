class Pad extends Boton {

    constructor(rutaImagen,x, y) {
        super(rutaImagen,x, y)
    }

    obtenerOrientacionX(pX){
        return pX - this.x;
    }

    obtenerOrientacionY(pY){
        return pY - this.y;
    }

}