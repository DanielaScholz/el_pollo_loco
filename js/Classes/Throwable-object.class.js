class ThrowableObject extends MoveableObject {
    height = 80;
    width = 50;
    

    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.position_x = x;
        this.position_y = y;
        this.throw();

    }

    throw(){
        this.rate_of_fall = 30;
        this.applyGravity();
        setInterval(() => {
            this.position_x +=10;
        }, 25);
        
    }
    
}