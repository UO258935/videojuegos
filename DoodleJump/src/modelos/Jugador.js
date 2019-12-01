class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador, x, y)

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        // Animaciones
        this.aIdleDerecha = new Animacion(imagenes.jugador_derecha,
            this.ancho, this.alto, 9, 20);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_izquierda,
            this.ancho, this.alto, 9, 20);

        this.animacion = this.aIdleDerecha;
        this.orientacion = orientaciones.izquierda;


    }

    saltar(){
        if ( !this.enElAire ) {
            this.vy = -9;
            this.enElAire = true;
        }

    }

    actualizar(){
        this.animacion.actualizar();

        // Saltar
        this.saltar();

        // ¿Esta en el aire?
        if (this.choqueAbajo == true){
            this.enElAire = false;
        } else {
            this.enElAire = true;
        }

        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        // Movimiento jugador
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }

        if ( this.vx != 0 ) {
            if (this.orientacion == orientaciones.derecha) {
                //this.animacion = this.aIdleDerecha;
                this.animacion = this.aIdleDerecha;
            }
            if (this.orientacion == orientaciones.izquierda) {
                this.animacion = this.aIdleIzquierda;
            }
        }

        if ( this.vx == 0){
            if (this.orientacion == orientaciones.derecha) {
                this.animacion = this.aIdleDerecha;
            }
            if (this.orientacion == orientaciones.izquierda) {
                this.animacion = this.aIdleIzquierda;
            }
        }


    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
    }


    moverX (direccion) {
        this.vx = direccion * 8;
    }


    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            reproducirEfecto(efectos.disparo);
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }

    }

}