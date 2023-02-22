class Endboss extends MoveableObject {
    height = 300;
    width = 170;
    position_y= 160;

    WALKING_IMAGES= [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor(){
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.WALKING_IMAGES);
        this.position_x = 1200;
        this.animateEndboss();
    }
 
    animateEndboss(){
        this.moveLeft();

        setInterval(() => {
            this.playImagesforAnimation(this.WALKING_IMAGES);
        }, 300);


    }

}