class Endboss extends MoveableObject {
    height = 300;
    width = 170;
    position_y= 160;

    IMAGES_WALKING= [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.position_x = 2000;
        this.animateEndboss();
    }
 
    animateEndboss(){
        this.moveLeft();

        setInterval(() => {
            this.playImagesforAnimation(this.IMAGES_WALKING);
        }, 300);


    }

}