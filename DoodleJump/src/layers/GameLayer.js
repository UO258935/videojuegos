class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();

    }

    iniciar() {
        this.espacio = new Espacio(1 );

        this.fondo = new Fondo(imagenes.fondo1, 320 * 0.5, 480 * 0.5);


        //arrays
        this.disparosJugador = [];
        this.bloques = [];
        this.enemigos = [];

        //cargar el mapa
        this.cargarMapa("res/"+nivelActual+".txt");

        //scroll
        this.scrollY = 0;

    }

    calcularScroll(){
        this.scrollY = this.jugador.y - 300;
    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }



    actualizar() {

        this.espacio.actualizar()
        this.jugador.actualizar();

        // Jugador se cae
        if (this.jugador.x > 350 || this.jugador.x < -10) {
            this.iniciar();
        }

        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }


        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null && this.disparosJugador[i].vy > 0){

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        // COLISIONES

        // Colisiones Enemigo - Jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }

        // Colisiones DisparoJugador - Enemigo
        for(var j = 0; j < this.disparosJugador.length; j++) {
            for (var i = 0; i < this.enemigos.length; i++) {
                if (this.enemigos[i] != null && this.disparosJugador[j] != null) {
                    if (this.disparosJugador[j].colisiona(this.enemigos[i])) {
                        this.espacio.eliminarCuerpoEstatico(this.enemigos[i]);
                        this.enemigos.splice(i, 1);
                        i = i - 1;

                        this.espacio
                            .eliminarCuerpoDinamico(this.disparosJugador[j]);
                        this.disparosJugador.splice(j, 1);
                    }
                }
            }
        }

        // Colision Jugador - Meta(invisible)
        if ( this.meta.colisiona(this.jugador)){
            nivelActual++;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.iniciar();
        }



    }




    dibujar() {
        this.calcularScroll();

        this.fondo.dibujar();

        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollY);
        }
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollY);
        }
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollY);
        }

        this.jugador.dibujar(this.scrollY);
    }

    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }
        }


        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.saltar();
        } else if ( controles.moverY < 0 ){

        } else {

        }

    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "C":
                this.meta = new Meta(x,y);
                this.meta.y = this.meta.y - this.meta.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoEstatico(this.meta);
                break;
            case "J":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "1":
                var bloque1 = new Bloque(imagenes.plataforma_izquierda, x,y);
                bloque1.y = bloque1.y - bloque1.alto/2;
                this.bloques.push(bloque1);
                this.espacio.agregarCuerpoEstatico(bloque1);
                break;
            case "2":
                var bloque2 = new Bloque(imagenes.plataforma_centro, x,y);
                bloque2.y = bloque2.y - bloque2.alto/2;
                this.bloques.push(bloque2);
                this.espacio.agregarCuerpoEstatico(bloque2);
                break;
            case "3":
                var bloque3 = new Bloque(imagenes.plataforma_derecha, x,y);
                bloque3.y = bloque3.y - bloque3.alto/2;
                this.bloques.push(bloque3);
                this.espacio.agregarCuerpoEstatico(bloque3);
                break;
            case "M":
                var enemigo = new Enemigo(x, y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoEstatico(enemigo);
                break;


        }
    }



}




