class DrawableObject {
    position_x = 100;

    img;
    imagesCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    //Methode um Bilder zu laden
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    //Methode um eine Bildabfolge aus einem Array zu laden  z.B. Pepe, Hühner
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imagesCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
    }

    //Methode um Rechtecke um die Objekte zu zeichen um Kollision erkennbar zu machen -> nur für die Spielentwicklung notwendig
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken) { // Bedingung gilt nur für Instanz Character & Chicken
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.position_x + this.offset.left, this.position_y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }


}