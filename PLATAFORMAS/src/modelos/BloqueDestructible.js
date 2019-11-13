class BloqueDestructible extends Modelo{
    constructor(x,y){
        super(imagenes.bloque_musgo,x,y)
        this.x=x;
    }

    getX(){
        return this.x;
    }
}