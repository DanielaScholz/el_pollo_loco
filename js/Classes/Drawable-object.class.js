class DrawableObject {

    /**
     * Horizontal position of the drawable object.
     * @type {number}
     */
    position_x = 100;


    /**
     * Image element representing the object's image.
     * @type {HTMLImageElement}
     */
    img;


    /**
     * Cache for images loaded with their respective paths as keys.
     * @type {Object.<string, HTMLImageElement>}
     */
    imagesCache = {};


    /**
     * Index of the current image being displayed.
     * @type {number}
     */
    currentImage = 0;


    /**
     * Offset object specifying top, bottom, left, and right offsets.
     * @type {Object}
     * @property {number} top - Top offset value.
     * @property {number} bottom - Bottom offset value.
     * @property {number} left - Left offset value.
     * @property {number} right - Right offset value.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    /**
     * Loads an image from the specified path.
     * @param {string} path - The path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


   /**
     * Loads a sequence of images from an array of paths.
     * @param {string[]} array - Array containing paths of images to load.
     */    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imagesCache[path] = img;
        });
    }


    /**
     * Draws the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
    }

}