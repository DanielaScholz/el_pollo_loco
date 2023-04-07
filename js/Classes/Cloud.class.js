class Cloud extends MoveableObject {
    width = 500;
    height = 250;
    speed = 0.5;


    constructor(path) {
        super().loadImage(path);
        this.position_x = 1 + Math.random() * 700;
        this.position_y = 1 + Math.random() * 135;
        this.animateClouds();
    }

    animateClouds() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 60);
    }

}