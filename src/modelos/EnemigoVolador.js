class EnemigoVolador extends Modelo{

    constructor(x,y){
        super(imagenes.enemigo,x,y);
        this.estado=estados.saltando;
        this.vyInteligencia=-1;
        this.vy=this.vyInteligencia;
        this.tiempoSalto=25;
        this.aVolar = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);

        this.aMorir = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));
        // Ref a la animación actual
        this.animacion = this.aVolar;
        this.vy=0;
        this.vx = 0;

    }

    getX(){
        return this.x;
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){
        // Actualizar animación
        this.animacion.actualizar();
        switch (this.estado){
            case estados.saltando:
                this.animacion = this.aVolar;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }

        if(this.tiempoSalto==0){
            this.vy=-25;
            this.tiempoSalto=25;
        }else {
            this.vy=0;
            this.tiempoSalto--;
        }

        if ( this.estado == estados.muriendo) {
            this.vy = 0;
        }

    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}