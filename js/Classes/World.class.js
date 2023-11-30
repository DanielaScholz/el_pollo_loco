class World {
    character = new Character();
    endboss = new Endboss();
    canvas;
    ctx;
    keyboard;
    mirroring = false; //Mirroring of objects while moving backward.
    camera_x = 0;
    level_end_position_x;
    dead = false; //Variable for checking if opponents are dead
    chicken_audio = new Audio('audio/chicken.mp3')

    level = level1;

    throwableObjects = [];
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * Runs different game loops to handle collisions and actions.
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithBabyChicken();
            this.checkCollisionsWithCoins();
            this.checkCollisionWithEndboss();
        }, 200);

        setStoppableInterval(() => {
            this.checkJumpingOnChicken();
            this.checkJumpingOnBabyChicken();
            this.checkThrowableObjects();
        }, 100)

        setStoppableInterval(() => {
            this.checkCollisionsWithBottles();
            this.checkEndbossPosition();
        }, 1000 / 60)

        setStoppableInterval(() => {
            this.checkThrowableObjects();
            this.checkCollisionWithBottleAndEndboss();
        }, 500)
    }


    /**
       * Checks for throwable objects to initiate throwing actions.
       */
    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.position_x + 100, this.character.position_y + 100);
            this.throwableObjects.push(bottle);
            this.throwBottle();
        }
    }


    /**
     * Checks collision between thrown bottles and the end boss.
     */
    checkCollisionWithBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                if (!audioMuted) {
                    this.chicken_audio.play();
                }
                this.endboss.hit(20);
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        })
    }


    /**
    * Checks collisions with chicken enemies.
    */
    checkCollisionsWithChicken() {
        this.level.chickens.forEach((enemy) => {
            this.collisionWithEnemies(enemy);
        })
    }


    /**
     * Checks collisions with baby chicken enemies.
     */
    checkCollisionsWithBabyChicken() {
        this.level.babyChickens.forEach((enemy) => {
            this.collisionWithEnemies(enemy);
        })
    }


    /**
     * Checks collision with the end boss.
     */
    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit(20);
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    /**
    * Checks and assigns the end boss's x-position to the level_end_position_x property.
    */
    checkEndbossPosition() {
        this.level_end_position_x = this.endboss.position_x;
    }


    /**
    * Handles collisions between the character and enemies, reducing character's energy if necessary.
    * @param {Object} enemy - The enemy object to check collision with.
    */
    collisionWithEnemies(enemy) {
        if (this.character.isColliding(enemy)) {
            if (!this.character.isAboveGround() && enemy.dead == false) {
                this.character.hit(5);
            }
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    /**
    *Checks for collisions when character jumps on chicken enemies, reducing enemy's health and removing them upon collision.
    */
    checkJumpingOnChicken() {
        this.level.chickens.forEach((enemy, index) => {
            if (this.collisionDetected(enemy)) {
                if (!audioMuted) { this.chicken_audio.play(); }
                enemy.hit(5);
                enemy.dead = true;
                setTimeout(() => {
                    this.level.chickens.splice(index, 1)
                }, 500);
            }
        })
    }


    /**
    * Checks for collisions when character jumps on baby chicken enemies, reducing enemy's health and removing them upon collision.
    */
    checkJumpingOnBabyChicken() {
        this.level.babyChickens.forEach((enemy, index) => {
            if (this.collisionDetected(enemy)) {
                if (!audioMuted) { this.chicken_audio.play(); }
                enemy.hit(5);
                enemy.dead = true;
                setTimeout(() => {
                    this.level.babyChickens.splice(index, 1)
                }, 500);
            }
        })
    }


    /**
     * Detects collisions between the character and enemies when the character is jumping.
     * @param {Object} enemy - The enemy object to check collision with.
     * @returns {boolean} - Returns true if collision is detected; otherwise, returns false.
    */
    collisionDetected(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.rate_of_fall < 0;
    }

    /**
    * Checks collisions between the character and coins, triggering coin collection if collision occurs.
    */
    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectingCoins(index);
            }
        })
    }


    /**
    * Checks collisions between the character and bottles, triggering bottle collection if collision occurs.
    */
    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectingBottles(index);
            }
        })
    }


    /**
    * Collects coins and updates character's coin count and the status bar.
    * @param {number} index - The index of the collected coin.
    */
    collectingCoins(index) {
        if (this.character.coins < 100) {
            this.level.coins.splice(index, 1);
            this.character.coins += 20;
            this.statusbarCoins.setPercentage(this.character.coins);
        }
    }


    /**
     * Collects bottles and updates character's bottle count and the status bar.
     * @param {number} index - The index of the collected bottle.
     */
    collectingBottles(index) {
        if (this.character.bottles < 100) {
            this.level.bottles.splice(index, 1);
            this.character.bottles += 20;
            this.statusbarBottles.setPercentage(this.character.bottles);
        }
    }


    /**
     * Decreases the character's bottle count when a bottle is thrown and updates the status bar.
     */
    throwBottle() {
        this.character.bottles -= 20;
        this.statusbarBottles.setPercentage(this.character.bottles);
    }


    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Clears the canvas, translates the canvas, and draws various game objects and status bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clearRect-> cleart beim Aktualisieren das Canvas, da sich sonst Figuren nicht bewegen würden

        this.ctx.translate(this.camera_x, 0); //mit translate(x,y) wird das Canvas nach links verschoben
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.chickens);
        this.addObjectsToMap(this.level.babyChickens);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); //Kamera verschiebt sich zurück

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.endboss.position_x < 1400 || this.character.position_x > 1000) {
            this.addToMap(this.statusbarEndboss);
        }

        this.ctx.translate(this.camera_x, 0); //Kamera verschiebt sich vor
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); //nachdem der Hintergrund, Wolken, Enemies, Pepe gezeichnet wurden, verschiebt sich das Canvas wieder zurück

        let self = this; //Trick, weil THIS nicht funktioniert
        requestAnimationFrame(() => self.draw());//requestAnimationFrame() -> damit wird draw() immer und immer wieder aufgerufen (sooft wie es die Grafikkarte zulässt, ohne das der Rechner sich aufhängt)
    }


    /**
     * Adds multiple objects to the map for rendering.
     * @param {Array} objects - Array containing the objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds an object to the map, including the logic for mirroring if needed.
     * @param {Object} mO - The moveable object to be added to the map.
     */
    addToMap(mO) {
        this.mirrorImage(mO); // Method to mirror the image
        mO.draw(this.ctx);
        // mO.drawFrame(this.ctx); // Draws a frame around objects for better collision coordination
        this.mirrorImageBack(mO); // Method to un-mirror the image
    }


    /**
     * Mirrors the image horizontally if the object is set to mirroring mode.
     * @param {Object} mO - The moveable object to be mirrored.
     */
    mirrorImage(mO) {
        if (mO.mirroring) {
            this.ctx.save(); // Saves the current state of the canvas
            this.ctx.translate(mO.width, 0); // Moves the canvas coordinate to display the object at the right edge of the canvas
            this.ctx.scale(-1, 1); // Horizontally mirrors the object (horizontal scaling by -1)
            mO.position_x = mO.position_x * -1; // Reverses the object's coordinate, so it appears on the left edge
        }
    }


    /**
     * Reverts the mirroring effect applied to the image.
     * @param {Object} mO - The moveable object to revert the mirroring.
     */
    mirrorImageBack(mO) {
        if (mO.mirroring) {
            mO.position_x = mO.position_x * -1; // Reverses the object's coordinate to bring it back to its original position
            this.ctx.restore(); // Restores the previously saved canvas state
        }
    }
}