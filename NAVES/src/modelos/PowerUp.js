class PowerUp extends Modelo{
    constructor(x,y){
        super(imagenes.powerup, x, y)
        this.vx = -3;
    }

    actualizar() {
        this.x = this.x + this.vx;
    }

}