class Fondo extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y);
        this.vy = 0;
    }


    actualizar(){
        if ( this.vy != 0) {
            if ( this.fondoAux == null){
                this.fondoAux =
                    new Fondo(this.imagen.src, this.x, this.y);
            }

            this.y = this.y + this.vy;

            // margen derecho se sale por la izquierda
            if (this.y + this.alto / 2 < 0) {
                // vuelve a aparecer por la parte derecha
                this.y = 320 + this.alto / 2;
            }
            // margen izquierdo se sale por la derecha
            if (this.y - this.alto / 2 > 320 ) {
                // vuelve a la parte izquierda
                this.y = 0 - this.alto / 2;
            }
        }
    }

    dibujar(){
        super.dibujar();

        if ( this.fondoAux != null ) {
            // hueco por la izquierda
            if ( this.y - this.alto/2 > 0){
                // pintar auxiliar por la izquierda
                this.fondoAux.y = this.y - this.alto;
            }
            // hueco por la derecha
            if (this.y + this.alto/2 < 480){
                // pintar auxiliar por la derecha
                this.fondoAux.y =this.y + this.alto;
            }
            this.fondoAux.dibujar();
        }
    }



}
