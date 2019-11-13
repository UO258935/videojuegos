class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));

        this.asteroides = [];
        this.asteroides.push(new Asteroide(200, 240));

        this.recoletables = [];
        //this.recoletables.push(new Recolectable(100, 150));

        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);

        this.disparosJugador = []
        this.puntos = new Texto(0,480*0.9,320*0.07 );

        this.vidasJugador = new Texto(this.jugador.vida,480*0.75,320*0.07);
        this.fondoVidas = new Fondo(imagenes.vidasJugador, 480*0.7, 320*0.07);

        this.powerups = [];
    }

    actualizar (){
        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        // Genera Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }
        this.iteracionesCrearEnemigos --;
        if ( this.iteracionesCrearEnemigos < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX,rY));
            this.iteracionesCrearEnemigos = 50;
        }


        //Genera Asteroides
        if(this.iteracionesCrearAsteroides == null){
            this.iteracionesCrearAsteroides =  0;
        }
        this.iteracionesCrearAsteroides--;
        if(this.iteracionesCrearAsteroides < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.asteroides.push(new Asteroide(rX, rY));
            this.iteracionesCrearAsteroides = 1000;
        }


        //Genera recolectables
        if(this.iteracionesCrearRecolectables == null){
            this.iteracionesCrearRecolectables = 0;
        }
        this.iteracionesCrearRecolectables--;
        if(this.iteracionesCrearRecolectables < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.recoletables.push(new Recolectable(rX, rY));
            this.iteracionesCrearRecolectables = 150;
        }

        //Genera PowerUps
        if(this.iteracionesCrearPowerUp == null){
            this.iteracionesCrearPowerUp = 0;
        }
        this.iteracionesCrearPowerUp--;
        if(this.iteracionesCrearPowerUp < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.powerups.push(new PowerUp(rX, rY));
            this.iteracionesCrearPowerUp = 200;
        }



        //actualizacioens
        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for(var i=0; i < this.asteroides.length;i++){
            this.asteroides[i].actualizar();
        }
        for(var i=0; i < this.recoletables.length; i++){
            this.recoletables[i].actualizar();
        }
        for(var i=0; i < this.powerups.length; i++){
            this.powerups[i].actualizar();
        }


        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
               if(this.vidasJugador.valor==1){
                   this.iniciar()
               }
               else{
                   this.enemigos.splice(i,1);
                    this.vidasJugador.valor--;
               }
            }
        }


        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    if(this.enemigos[j].vida == 1){
                        this.disparosJugador.splice(i, 1);
                        i = i-1;
                        this.enemigos.splice(j, 1);
                        j = j-1;
                        this.puntos.valor++;
                    }
                    else{
                        this.enemigos[j].vida--;
                        this.disparosJugador.splice(i, 1);
                        this.jugador.contadorDisparo +=1;
                        i = i-1;
                    }
                }
            }
        }

        //colisiones jugador-asteroide
        for(var i=0; i < this.asteroides.length; i++){
            if(this.jugador.colisiona(this.asteroides[i])){
                this.asteroides.splice(i,1);
                this.enemigos=[];
            }
        }

        //colisiones jugador-recoltable
        for(var i = 0; i < this.recoletables.length; i++){
            if( this.jugador.colisiona(this.recoletables[i])){
                this.recoletables.splice(i,1);
                this.puntos.valor++;

            }
        }

        //colisiones jugador-powerup
        for(var i=0; i < this.powerups.length; i++){
            if(this.jugador.colisiona(this.powerups[i])){
                this.powerups.splice(i,1);
                this.jugador.contadorDisparo +=10;
            }
        }

    }

    dibujar (){
        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        this.jugador.dibujar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        for(var i=0; i < this.asteroides.length; i++){
            this.asteroides[i].dibujar();
        }

        for(var i=0; i < this.recoletables.length; i++){
            this.recoletables[i].dibujar();
        }

        for(var i=0; i < this.powerups.length; i++){
            this.powerups[i].dibujar();
        }



        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        this.fondoVidas.dibujar();
        this.vidasJugador.dibujar();


    }


    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
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
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }


}
