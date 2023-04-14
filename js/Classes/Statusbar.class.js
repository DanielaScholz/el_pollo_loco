class Statusbar extends DrawableObject {
    height= 60; //Höhe der Statusbar
    width = 200; //Breite der Statusbar
    percentage;


    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.getIndexForImage()];
        this.img = this.imagesCache[path];
    }
    

    getIndexForImage(){
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0  
        }  
    }
}