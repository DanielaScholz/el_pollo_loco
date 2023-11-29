class Coin extends MoveableObject {

    /**
     * Measurements of the coins.
     * @type {number}
     */
    height = 140;
    width = 140;


    /**
     * Offset object specifying top, bottom, left, and right offsets.
     * @type {Object}
     * @property {number} top - Top offset value.
     * @property {number} bottom - Bottom offset value.
     * @property {number} left - Left offset value.
     * @property {number} right - Right offset value.
     */
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    }


    /**
     * Array containing images for animations.
     * @type {string[]}
     */
    IMAGES=[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.position_x = (Math.random()*1701) +100;
        this.position_y = (Math.random()*51) +250;
        this.loadImages(this.IMAGES);
        this.animateCoins();
    }


    /**
     * Animates the coins by setting intervals.
     */
    animateCoins(){
        setStoppableInterval(() => {
            this.playImagesforAnimation(this.IMAGES);
        }, 400);
    }
}