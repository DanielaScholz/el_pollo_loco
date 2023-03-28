class ThrowableObject extends MoveableObject {
    height = 80;
    width = 50;

    IMAGE_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.position_x = x;
        this.position_y = y;
        this.throw();

    }

    throw() {
        this.rate_of_fall = 30;
        this.applyGravity();
        this.animationOfBottle();

        setStoppableInterval(() => {
            if (world.character.mirroring == true) {
                this.position_x -= 10;
            } else {
                this.position_x += 10;
            }

        }, 25);

    }

    animationOfBottle(){
        setStoppableInterval(() => {
            if (this.position_y > 240) {
                this.playImagesforAnimation(this.IMAGE_BOTTLE_SPLASH);
            } else {
                this.playImagesforAnimation(this.IMAGE_BOTTLE_ROTATION);
            }
        }, 100);

    }

    

}