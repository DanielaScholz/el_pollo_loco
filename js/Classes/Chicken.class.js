class Chicken extends MoveableObject {
    height = 80;
    width = 50;
    position_y = 370;
    energy = 5;

    offset = {
        top: 25,
        bottom: 10,
        left: 10,
        right: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.position_x = 200 + Math.random() * 900;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animateChicken();
    }

    animateChicken() {
        setStoppableInterval(() => {
            this.chickenMovesLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playImagesforAnimation(this.IMAGES_DEAD);
            } else {
                this.playImagesforAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }


    chickenMovesLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }


}