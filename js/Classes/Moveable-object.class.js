class MoveableObject extends DrawableObject {
    speed = 0.15; // Geschwindigkeit von Objekten z.B. Hühnern
    energy = 100; //Energie der Objekte (Character, Endboss, Hühner)
    coins = 0;
    bottles = 0;
    lastHit = 0;
    rate_of_fall = 0; //Fallgeschwindigkeit ->speedY
    acceleration = 3; //Beschleunigung
    dead = false;


    

    moveRight() {
        this.position_x += this.speed;
    }


    //Methode um Hühner nach links gehen zu lassen
    moveLeft() {
        this.position_x -= this.speed;
    }


    //Animation beim Gehen - Bildabfolge wird in einer Schleife ausgeführt, damit sich die Beine von Pepe bewegen
    playImagesforAnimation(images_array) {
        let i = this.currentImage % images_array.length;
        let path = images_array[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.rate_of_fall > 0) {
                this.position_y -= this.rate_of_fall;
                this.rate_of_fall -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.position_y < 180;
        }
    }

    
    isColliding(mO){
        return this.position_x + this.width - this.offset.right > mO.position_x + mO.offset.left &&
        this.position_y + this.height - this.offset.bottom > mO.position_y + mO.offset.top &&
        this.position_x + this.offset.left < mO.position_x + mO.width - mO.offset.right && 
        this.position_y + this.offset.top < mO.position_y + mO.height - mO.offset.bottom;
    }

    // isColliding(mO){
    //     return this.position_x + this.width > mO.position_x &&
    //     this.position_y + this.height > mO.position_y &&
    //     this.position_x < mO.position_x && 
    //     this.position_y < mO.position_y + mO.height;
    // }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    // isColliding(mO) {
    //     return (this.position_x + this.width) >= mO.position_x && this.position_x <= (mO.position_x + mO.width) &&
    //         (this.position_y + this.offsetY + this.height) >= mO.position_y &&
    //         (this.position_y + this.offsetY) <= (mO.position_y + mO.height) &&
    //         mO.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    // }

    hit(damage){
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
        timePassed = timePassed / 1000; //Differenz in Sekunden
        return timePassed < 1;
    }


    isDead(){
        return this.energy == 0;
    }
    

   


}