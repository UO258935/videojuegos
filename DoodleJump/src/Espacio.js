class Espacio {

    constructor(gravedad) {
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = [];
    }

    actualizar() {
        for (var i = 0; i < this.dinamicos.length; i++) {
            // Aplicar gravedad ( dinamicos)
            this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;
            // Maxima velocidad de caida por gravedad
            if (this.dinamicos[i].vy > 20 && this.dinamicos[i].gravedad ) {
                this.dinamicos[i].vy = 20;
            }
            else{
                this.dinamicos[i].y = this.dinamicos[i].y + this.dinamicos[i].vy;
            }

            // Reiniciar choques
            this.dinamicos[i].choqueAbajo = false;

            this.moverAbajo(i);
        }

        }

        moverAbajo(i){
            if (this.dinamicos[i].vy > 0) {
                var movimientoPosible = this.dinamicos[i].vy;

                for (var j = 0; j < this.estaticos.length; j++) {
                    var arribaDinamico = this.dinamicos[i].y - this.dinamicos[i].alto / 2;
                    var abajoDinamico = this.dinamicos[i].y + this.dinamicos[i].alto / 2;
                    var derechaDinamico = this.dinamicos[i].x + this.dinamicos[i].ancho / 2;
                    var izquierdaDinamico = this.dinamicos[i].x - this.dinamicos[i].ancho / 2;
                    var arribaEstatico= this.estaticos[j].y - this.estaticos[j].alto / 2;
                    var abajoEstatico= this.estaticos[j].y + this.estaticos[j].alto / 2;
                    var derechaEstatico = this.estaticos[j].x + this.estaticos[j].ancho / 2;
                    var izquierdaEstatico = this.estaticos[j].x - this.estaticos[j].ancho / 2;

                    // Alerta!, Elemento estático en la trayectoria.
                    if (abajoDinamico  > arribaEstatico &&
                        arribaDinamico < abajoEstatico
                        && izquierdaDinamico < derechaEstatico
                        && derechaDinamico > izquierdaEstatico) {

                        // Comprobamos si la distancia al estático es menor
                        // que nuestro movimientoPosible actual
                        if (movimientoPosible > arribaEstatico - abajoDinamico) {
                            // La distancia es MENOR que nuestro movimiento posible
                            // Tenemos que actualizar el movimiento posible a uno menor
                            this.dinamicos[i].choqueAbajo = true;
                            movimientoPosible = arribaEstatico - abajoDinamico ;

                        }
                    }
                }
                // Ya se han comprobado todos los estáticos
                this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
                this.dinamicos[i].vy = movimientoPosible;
            }
        }

        agregarCuerpoDinamico(modelo)
        {
            this.dinamicos.push(modelo);
        }

        agregarCuerpoEstatico(modelo)
        {
            this.estaticos.push(modelo);
        }

        eliminarCuerpoDinamico(modelo)
        {
            for (var i = 0; i < this.dinamicos.length; i++) {
                if (this.dinamicos[i] == modelo) {
                    this.dinamicos.splice(i, 1);
                }
            }
        }

        eliminarCuerpoEstatico(modelo)
        {
            for (var i = 0; i < this.estaticos.length; i++) {
                if (this.estaticos[i] == modelo) {
                    this.estaticos.splice(i, 1);
                }
            }
        }




}
