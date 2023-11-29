class BackgroundObject extends MoveableObject {
    /**
     * Measurements of moveable objects.
     * @type {number}
     */
    height = 480;
    width = 720;

    constructor(path, position_x, position_y) {
        super().loadImage(path);
        this.position_x = position_x;
        this.position_y = position_y;
    }

}