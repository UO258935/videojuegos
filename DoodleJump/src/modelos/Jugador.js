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
            this.ancho, this.alto, 5, 20);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_izquierda,
            this.ancho, this.alto, 5, 20);

        this.animacion = this.aIdleDerecha;
        this.orientacion = orientaciones.derecha;


    }

    saltar(){
        if ( !this.enElAire ) {
            debugger
            this.vy = -16;
            this.enElAire = true;
        }

    }

    actualizar(){
        this.animacion.actualizar();

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

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }

        // Selección de animación
        if ( this.vx != 0 ) {
            if (this.orientacion == orientaciones.derecha) {
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


    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }

    }

}