class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);

        this.botonSalto = new Boton(imagenes.boton_salto,480*0.9,320*0.55);
        this.botonDisparo = new Boton(imagenes.boton_disparo,480*0.75,320*0.83);
        this.pad = new Pad(480*0.14,320*0.8);

        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.puntos = new Texto(0,480*0.9,320*0.07 );

        this.fondoRecolectables = new Fondo(imagenes.icono_recolectable, 480*0.25,320*0.07);
        this.puntosRecolectable = new Texto(0,480*0.3,320*0.07 );

        this.disparosJugador = []
        this.recolectables=[];
        this.enemigos = [];
        this.scrollX = 0;
        this.bloques = [];
        this.bloquesDestructibles = [];
        this.bloquesDestructiblesDisparo = [];
        this.enemigosEstaticos = [];
        this.enemigosVoladores = [];

        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar (){
        this.espacio.actualizar();

        if ( this.copa.colisiona(this.jugador)){
            nivelActual++;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.iniciar();
        }



        // Jugador se cae
        if ( this.jugador.y > 480 ){
            this.iniciar();
        }

        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }


        // elementos fuera
        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j-1;
            }
        }


        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }


        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for(var i=0; i < this.recolectables.length;i++){
            this.recolectables[i].actualizar();
        }
        for(var i=0; i < this.enemigosEstaticos.length; i++){
            this.enemigosEstaticos[i].actualizar();
        }
        for(var i=0; i<this.enemigosVoladores.length; i++){
            this.enemigosVoladores[i].actualizar();
        }

        // colisiones enemigo-jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }
        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].estado != estados.muriendo &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigos[j].impactado();

                    this.puntos.valor++;
                }
            }
        }

        //colisiones jugador-recoltable
        for(var i = 0; i < this.recolectables.length; i++){
            if(this.recolectables[i] != null && this.jugador.colisiona(this.recolectables[i])){
                this.recolectables.splice(i,1);
                this.puntosRecolectable.valor++;
            }
        }

        //Jugador encima bloque destruible
        if(this.itBloqDest==null){
            this.itBloqDest=1;
        }
        for(var i=0;i<this.bloquesDestructibles.length;i++){
            if ((this.jugador.getX()/this.bloquesDestructibles[i].getX()>0.96 && this.jugador.getX()/this.bloquesDestructibles[i].getX()<1.08)){
                this.itBloqDest++;
                console.log(this.itBloqDest)
                if(this.itBloqDest > 50){
                    this.espacio.eliminarCuerpoEstatico(this.bloquesDestructibles[i]);
                    this.bloquesDestructibles.splice(i,1);
                    this.itBloqDest=0;
                }
            }
        }

        //Colision disparoJugador-bloqueDestructibleDisparo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.bloquesDestructiblesDisparo.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.bloquesDestructiblesDisparo[j] != null &&
                    this.disparosJugador[i].colisiona(this.bloquesDestructiblesDisparo[j])) {

                    this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);

                    this.espacio.eliminarCuerpoEstatico(this.bloquesDestructiblesDisparo[j])
                    this.bloquesDestructiblesDisparo.splice(j,1 );
                }
            }
        }

        //Jugador encima de enemigo estatic
        for(var i=0;i<this.enemigosEstaticos.length;i++){
            if (this.jugador.getX()>this.enemigosEstaticos[i].getX()){
                this.espacio.eliminarCuerpoEstatico(this.enemigosEstaticos[i]);
                this.enemigosEstaticos.splice(i, 1);
            }
        }

        //Jugador-enemigoVolador ENCIMA
        for(var i=0;i<this.enemigosVoladores.length;i++){
            if (this.jugador.getX()>this.enemigosVoladores[i].getX()){
                this.espacio.eliminarCuerpoDinamico(this.enemigosVoladores[i]);
                this.enemigosVoladores.splice(i, 1);
            }
        }

        //disparo-EnemigoVolador
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigosVoladores.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigosVoladores[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigosVoladores[j])) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigosVoladores[j].impactado();

                    this.puntos.valor++;
                }
            }
        }

        // colisiones jugador-enemigoVOlador
        for (var i=0; i < this.enemigosVoladores.length; i++){
            if ( this.jugador.colisiona(this.enemigosVoladores[i])){
                this.iniciar();
            }
        }

        // Enemigo2 muertos fuera del juego
        for (var j=0; j < this.enemigosVoladores.length; j++){
            if ( this.enemigosVoladores[j] != null &&
                this.enemigosVoladores[j].estado == estados.muerto  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigosVoladores[j]);

                this.enemigosVoladores.splice(j, 1);
                j = j-1;
            }
        }
    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }
        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

    }


    dibujar (){
        this.calcularScroll();

        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }
        for(var i = 0; i < this.recolectables.length; i++){
            this.recolectables[i].dibujar(this.scrollX);
        }
        this.copa.dibujar(this.scrollX);
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.bloquesDestructibles.length; i++){
            this.bloquesDestructibles[i].dibujar(this.scrollX);
        }
        for(var i = 0; i < this.bloquesDestructiblesDisparo.length; i++){
            this.bloquesDestructiblesDisparo[i].dibujar(this.scrollX);
        }
        for(var i = 0; i < this.enemigosEstaticos.length; i++){
            this.enemigosEstaticos[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }
        for(var i=0; i < this.enemigosVoladores.length; i++){
            this.enemigosVoladores[i].dibujar(this.scrollX);
        }
        this.jugador.dibujar(this.scrollX);



        // HUD
        this.fondoRecolectables.dibujar();
        this.puntosRecolectable.dibujar();
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        if ( !this.pausa && entrada == entradas.pulsaciones) {
            this.botonDisparo.dibujar();
            this.botonSalto.dibujar();
            this.pad.dibujar();
        }
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

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "C":
                this.copa = new Bloque(imagenes.copa, x,y);
                this.copa.y = this.copa.y - this.copa.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;
            case "E":
                var enemigo = new Enemigo(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "R":
                var recolectable = new Recolectable(x,y);
                recolectable.y = recolectable.y - recolectable.alto/2;
                this.recolectables.push(recolectable)
                this.espacio.agregarCuerpoDinamico(recolectable);
                break;
            case "W":
                var bloqueDestructible = new BloqueDestructible(x,y);
                bloqueDestructible.y = bloqueDestructible.y - bloqueDestructible.alto/2;
                this.bloquesDestructibles.push(bloqueDestructible);
                this.espacio.agregarCuerpoEstatico(bloqueDestructible);
                break;
            case "U":
                var bloqueDestructibleDisparo = new BloqueDestructibleDisparo(x,y);
                bloqueDestructibleDisparo.y = bloqueDestructibleDisparo.y - bloqueDestructibleDisparo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloquesDestructiblesDisparo.push(bloqueDestructibleDisparo);
                this.espacio.agregarCuerpoEstatico(bloqueDestructibleDisparo);
                break;
            case "T":
                var enemigoEstatico = new EnemigoEstatico(x,y);
                enemigoEstatico.y = enemigoEstatico.y - enemigoEstatico.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigosEstaticos.push(enemigoEstatico);
                this.espacio.agregarCuerpoEstatico(enemigoEstatico);
                break;
            case "V":
                var volador = new EnemigoVolador(x,y);
                volador.y = volador.y - volador.alto/2;
                this.enemigosVoladores.push(volador)
                this.espacio.agregarCuerpoDinamico(volador);
                break;
        }
    }

    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonDisparo.pulsado = false;
        this.botonSalto.pulsado = false;

        // suponemos que el pad está sin tocar
        controles.moverX = 0;



        for(var i=0; i < pulsaciones.length; i++){
            if (this.pad.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                if ( orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = 1;
                }
                if ( orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = -1;
                }
            }


            if (this.botonDisparo.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonDisparo.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.disparo = true;
                }
            }

            if (this.botonSalto.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonSalto.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }

        }

        // No pulsado - Boton Disparo
        if ( !this.botonDisparo.pulsado ){
            controles.disparo = false;
        }

        // No pulsado - Boton Salto
        if ( !this.botonSalto.pulsado ){
            controles.moverY = 0;
        }
    }


}
