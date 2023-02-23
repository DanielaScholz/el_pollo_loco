class BabyChicken extends MoveableObject{
    height = 60;
    width = 40;
    position_y= 390;

    
    IMAGES_WALKING= [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.position_x = 300 + Math.random()*500;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.3 + Math.random() * 0.4;
        this.animateChicken();
    }

    animateChicken(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playImagesforAnimation(this.IMAGES_WALKING);
        }, 300);
    }

}