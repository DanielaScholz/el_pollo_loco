class BabyChicken extends MoveableObject {
    /**
     * Measurements of the baby chicken.
     * @type {number}
     */
    height = 60;
    width = 40;

    /**
     * Vertical position of the baby chicken.
     * @type {number}
     */
    position_y = 390;


    /**
     * Offset object specifying top, bottom, left, and right offsets.
     * @type {Object}
     * @property {number} top - Top offset value.
     * @property {number} bottom - Bottom offset value.
     * @property {number} left - Left offset value.
     * @property {number} right - Right offset value.
     */
    offset = {
        top: 15,
        bottom: 15,
        left: 5,
        right: 5
    }


    /**
     * Array containing images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    /**
     * Array containing images for the dead state.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
     * Constructs a BabyChicken object.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.position_x = 300 + Math.random() * 700;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.3 + Math.random() * 0.4;
        this.animateChicken();
    }


    /**
     * Animates the baby chicken by setting intervals for walking and image changing.
     */
    animateChicken() {
        setStoppableInterval(() => {
            this.babyChickenWalksLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playImagesforAnimation(this.IMAGES_DEAD);
            } else {
                this.playImagesforAnimation(this.IMAGES_WALKING);
            }
        }, 300);
    }


    /**
      * Moves the baby chicken to the left if it is not dead.
      */
    babyChickenWalksLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }
}