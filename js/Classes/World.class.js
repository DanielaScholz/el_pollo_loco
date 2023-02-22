class World {
    canvas;
    ctx;
    keyboard;
    mirroring = false; //Spiegelung von Objekten beim Rückwertsgehen
    camera_x = 0;
    level_end_position_x = 2157;

    level = level1;

    character = new Character();    
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();



    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollition();
    }

    checkCollition(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            })
        }, 200); 
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clearRect-> cleart beim Aktualisieren das Canvas, da sich sonst Figuren nicht bewegen würden
        this.ctx.translate(this.camera_x,0); //mit translate(x,y) wird das Canvas nach links verschoben

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);


        this.ctx.translate(-this.camera_x,0); //Kamera verschiebt sich zurück
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x,0); //Kamera verschiebt sich vor


        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x,0); //nachdem der Hintergrund, Wolken, Enemies, Pepe gezeichnet wurden, verschiebt sich das Canvas wieder zurück

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
        mO.drawFrame(this.ctx); //zeichnet Rahmen um Objekte
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