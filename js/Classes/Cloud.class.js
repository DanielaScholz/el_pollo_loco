class Cloud extends MoveableObject {

    /**
     * Measurements of the cloud.
     * @type {number}
     */
    width = 500;
    height = 250;

    /**
     * Speed level of the cloud.
     * @type {number}
     */
    speed = 0.5;


    constructor(path) {
        super().loadImage(path);
        this.position_x = 1 + Math.random() * 700;
        this.position_y = 1 + Math.random() * 135;
        this.animateClouds();
    }

    /**
     * Moves the clourd to the left.
     */
    animateClouds() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 60);
    }

}