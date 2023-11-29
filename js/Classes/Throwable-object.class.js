class ThrowableObject extends MoveableObject {

    /**
     * Measurements of the status bar.
     * @type {number}
     */
    height = 80;
    width = 50;


    /**
     * Array containing images for the animation.
     * @type {string[]}
     */
    IMAGE_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.position_x = x;
        this.position_y = y;
        this.throw();
    }


    /**
     * Initiates the throwing action and bottle animation.
     */
    throw() {
        this.rate_of_fall = 30;
        this.applyGravity();
        this.animationOfBottle();

        // Moves the thrown object left or right based on the world's mirroring state
        setStoppableInterval(() => {
            if (world.mirroring == true) {
                this.position_x -= 10;
            } else {
                this.position_x += 10;
            }
        }, 25);
    }

    /**
     * Controls the animation sequence of the thrown bottle.
     */
    animationOfBottle() {
        // Sets intervals for bottle animation based on its position
        setStoppableInterval(() => {
            if (this.position_y > 240) {
                // Plays splash animation if the bottle is below a certain y-position
                this.playImagesforAnimation(this.IMAGE_BOTTLE_SPLASH);
            } else {
                // Plays rotation animation if the bottle is above a certain y-position
                this.playImagesforAnimation(this.IMAGE_BOTTLE_ROTATION);
            }
        }, 100);
    }
}