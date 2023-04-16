class Bottle extends MoveableObject{
    height = 80;
    width = 60;

    offset = {
        top: 20,
        bottom: 20,
        left: 30,
        right: 30
    }

    position_y = 365;

    IMAGE_BOTTLE_GROUND = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(){
        super().loadImage(this.IMAGE_BOTTLE_GROUND[0]);
        this.position_x = (Math.random()*1701) +100;
    }


}