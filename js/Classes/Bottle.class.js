class Bottle extends MoveableObject {
    /**
 * Measurements of the bottle.
 * @type {number}
 */
    height = 80;
    width = 60;


    /**
     * Vertical position of the bottle.
     * @type {number}
     */
    position_y = 365;

    /**
         * Offset object specifying top, bottom, left, and right offsets.
         * @type {Object}
         * @property {number} top - Top offset value.
         * @property {number} bottom - Bottom offset value.
         * @property {number} left - Left offset value.
         * @property {number} right - Right offset value.
         */
    offset = {
        top: 20,
        bottom: 20,
        left: 30,
        right: 30
    }


    IMAGE_BOTTLE_GROUND = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE_BOTTLE_GROUND[0]);
        this.position_x = (Math.random() * 1701) + 100;
    }


}