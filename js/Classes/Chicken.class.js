class Chicken extends MoveableObject {
    /**
     * Measurements of the chicken.
     * @type {number}
     */
    height = 80;
    width = 50;

    /**
     * Vertical position of the baby chicken.
     * @type {number}
     */
    position_y = 370;


    /**
     * Energy level of the chicken.
     * @type {number}
     */
    energy = 5;


    /**
     * Offset object specifying top, bottom, left, and right offsets.
     * @type {Object}
     * @property {number} top - Top offset value.
     * @property {number} bottom - Bottom offset value.
     * @property {number} left - Left offset value.
     * @property {number} right - Right offset value.
     */
    offset = {
        top: 25,
        bottom: 10,
        left: 10,
        right: 10
    }


    /**
     * Array containing images for animations.
     * @type {string[]}
     */
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


    /**
     * Animates the chicken by setting intervals for movement and animations.
     */
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


    /**
     * Moves the chicken to the left if it is not dead.
     */
    chickenMovesLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }


}