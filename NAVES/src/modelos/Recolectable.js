class Recolectable extends Modelo{
    constructor(x,y){
        super(imagenes.recolectable, x,y);


        this.vx = 1;
    }

    actualizar (){
        this.vx = -1.5;
        this.x = this.x + this.vx;
    }



}