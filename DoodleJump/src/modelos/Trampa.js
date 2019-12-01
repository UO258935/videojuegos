class Trampa extends Modelo{
    constructor(x, y) {
        super(imagenes.meta, x, y)

        this.aMover = new Animacion(imagenes.trampa,
            this.ancho, this.alto, 6, 5);


        this.animacion = this.aMover;

        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;
        this.vy = 0;

    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){
        this.animacion.actualizar();





    }
    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
    }
}