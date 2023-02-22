class Chicken extends MoveableObject {
    height = 80;
    width = 50;
    position_y= 370;

    WALKING_IMAGES= [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.position_x = 200 + Math.random()*500;
        this.loadImages(this.WALKING_IMAGES);
        this.speed = 0.15 + Math.random() * 0.4;
        this.animateChicken();
    }
 
    animateChicken(){

        setInterval(() => {
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playImagesforAnimation(this.WALKING_IMAGES);
        }, 300);


    }
   

}