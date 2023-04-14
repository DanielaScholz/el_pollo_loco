class BabyChicken extends MoveableObject{
    height = 60;
    width = 40;
    position_y= 390;
    energy = 5;

    offset = {
        top: 15,
        bottom: 15,
        left: 5,
        right: 5
    }

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
        this.position_x = 300 + Math.random()*700;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.3 + Math.random() * 0.4;
        this.animateChicken();
    }


    animateChicken(){
        setStoppableInterval(() => {
            this.babyChickenWalksLeft();
        }, 1000/60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playImagesforAnimation(this.IMAGES_DEAD);
            } else {
                this.playImagesforAnimation(this.IMAGES_WALKING);}
        }, 300);
    }


    babyChickenWalksLeft(){
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

}