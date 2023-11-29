class MoveableObject extends DrawableObject {
    /**
     * Speed of the movable object (e.g., chickens).
     * @type {number}
     */
    speed = 0.15;

    /**
     * Energy level of the object (Character, Endboss, Chickens).
     * @type {number}
     */
    energy = 100;

    /**
     * Number of coins the object holds.
     * @type {number}
     */
    coins = 0;


    /**
    * Number of bottles the object has.
    * @type {number}
    */
    bottles = 0;

    /**
     * Timestamp of the last hit taken by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Rate of falling (vertical speed).
     * @type {number}
     */
    rate_of_fall = 0;

    /**
     * Acceleration of the object.
     * @type {number}
     */
    acceleration = 3;

    /**
     * Represents the dead state of the object.
     * @type {boolean}
     */
    dead = false;


    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.position_x += this.speed;
    }


    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.position_x -= this.speed;
    }


    /**
    * Plays a sequence of images to create an animation sequence.
    * @param {string[]} images_array - An array containing paths of images for the animation.
    */    playImagesforAnimation(images_array) {
        let i = this.currentImage % images_array.length;
        let path = images_array[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
    }

    
    /**
     * Applies gravity to the object's vertical position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.rate_of_fall > 0) {
                this.position_y -= this.rate_of_fall;
                this.rate_of_fall -= this.acceleration;
                if (this instanceof Character && this.position_y > 180) {
                    this.position_y = 180;
                }
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} Whether the object is above the ground or not.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.position_y < 180; //bei 180px auf der y-Achse beginnt der Boden
        }
    }


    /**
     * Checks collision between this object and another MoveableObject.
     * @param {MoveableObject} mO - The MoveableObject to check collision with.
     * @returns {boolean} Whether the objects are colliding or not.
     */
    isColliding(mO) {
        return this.position_x + this.width - this.offset.right > mO.position_x + mO.offset.left &&
            this.position_y + this.height - this.offset.bottom > mO.position_y + mO.offset.top &&
            this.position_x + this.offset.left < mO.position_x + mO.width - mO.offset.right &&
            this.position_y + this.offset.top < mO.position_y + mO.height - mO.offset.bottom;
    }


    /**
     * Deals damage to the object based on a specified amount.
     * @param {number} damage - The amount of damage to be dealt.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is hurt based on the last hit time.
     * @returns {boolean} Whether the object is in a hurt state or not.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
        timePassed = timePassed / 1000; //Differenz in Sekunden
        return timePassed < 1;
    }


    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} Whether the object is dead or not.
     */
    isDead() {
        return this.energy == 0;
    }
}