class World {
    character = new Character();
    endboss = new Endboss();
    canvas;
    ctx;
    keyboard;
    mirroring = false; //Spiegelung von Objekten beim Rückwertsgehen
    camera_x = 0;
    level_end_position_x = 2876;
    dead = false; //Variable zum Auslesen, ob Gegner tot sind
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
        }, 1000 / 60)

        setStoppableInterval(() => {
            this.checkThrowableObjects();
            this.checkCollisionWithBottleAndEndboss();
        }, 500)
    }


    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.position_x + 100, this.character.position_y + 100);
            this.throwableObjects.push(bottle);
            this.throwBottle();
        }
    }


    checkCollisionWithBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                if (!audioMuted) {
                    this.chicken_audio.play();}
                this.endboss.hit(20);
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        })
    }


    checkCollisionsWithChicken() {
        this.level.chickens.forEach((enemy) => {
            this.collisionWithEnemies(enemy);
        })
    }


    checkCollisionsWithBabyChicken() {
        this.level.babyChickens.forEach((enemy) => {
            this.collisionWithEnemies(enemy);
        })
    }


    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit(20);
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    collisionWithEnemies(enemy) {
        if (this.character.isColliding(enemy)) {
            if (!this.character.isAboveGround() && enemy.dead == false) {
                this.character.hit(5);}
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    checkJumpingOnChicken() {
        this.level.chickens.forEach((enemy, index) => {
            if (this.collisionDetected(enemy)) {
                if (!audioMuted) { this.chicken_audio.play();}
                enemy.hit(5);
                enemy.dead = true;
                setTimeout(() => {
                    this.level.chickens.splice(index, 1)
                }, 1000);
            }
        })
    }


    checkJumpingOnBabyChicken() {
        this.level.babyChickens.forEach((enemy, index) => {
            if (this.collisionDetected(enemy)) {
                if (!audioMuted) {this.chicken_audio.play();}
                enemy.hit(5);
                enemy.dead = true;
                setTimeout(() => {
                    this.level.babyChickens.splice(index, 1)
                }, 1000);
            }
        })
    }


    collisionDetected(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.rate_of_fall < 0;
    }


    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectingCoins(index);
            }
        })
    }


    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectingBottles(index);
            }
        })
    }


    collectingCoins(index) {
        if (this.character.coins < 100) {
            this.level.coins.splice(index, 1);
            this.character.coins += 20;
            this.statusbarCoins.setPercentage(this.character.coins);
        }

    }


    collectingBottles(index) {
        if (this.character.bottles < 100) {
            this.level.bottles.splice(index, 1);
            this.character.bottles += 20;
            this.statusbarBottles.setPercentage(this.character.bottles);
        }
    }


    throwBottle() {
        this.character.bottles -= 20;
        this.statusbarBottles.setPercentage(this.character.bottles);
    }


    setWorld() {
        this.character.world = this;
    }


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


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mO) {
        this.mirrorImage(mO); //Methode um Bild zu spiegeln
        mO.draw(this.ctx);
       //mO.drawFrame(this.ctx); //zeichnet Rahmen um Objekte, um Kollision besser abstimmen zu können
        this.mirrorImageBack(mO); //Methode um Bild zu zurückzuspiegeln
    }


    mirrorImage(mO) {
        if (mO.mirroring) { //Bedinung ist das mO (moveable object) true ist
            this.ctx.save(); // wird Bedinung erfüllt, wird der aktuelle Zustand des Canvas gespeichert um später wieder darauf zugreifen zu können
            this.ctx.translate(mO.width, 0); //die Koordinate des Canvas wird verschoben, das mO wird am rechten Rand des Canvas angezeigt
            this.ctx.scale(-1, 1); // hier findet die Spiegelung auf der Horizontalen (-1) statt, die Vertikale bleibt mit (1) unberührt
            mO.position_x = mO.position_x * -1; //die Koordinate des Objekts wird mit -1 umgekehrt, sodass das Objekt wieder am linken Rand steht
        }
    }


    mirrorImageBack(mO) {
        if (mO.mirroring) { //Bedingung überprüft ob mO true ist
            mO.position_x = mO.position_x * -1; //Koordinate wird erneut umgekehrt, sodass das Objekt wieder an seinen urpsrünglichen Standort ist
            this.ctx.restore(); // der zuvor gespeicherte Zustand wird wiederhergestellt
        }
    }
}