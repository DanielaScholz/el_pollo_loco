class Statusbar extends DrawableObject {
    /**
     * Measurements of the status bar.
     * @type {number}
     */
    height = 60;
    width = 200;


    /**
     * Current percentage value for the status bar.
     * @type {number}
     */
    percentage;


    /**
    * Sets the percentage value for the status bar.
    * @param {number} percentage - The percentage value to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getIndexForImage()];
        this.img = this.imagesCache[path];
    }


    /**
     * Determines the index for the image based on the current percentage value.
     * @returns {number} The index for the image.
     */
    getIndexForImage() {
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