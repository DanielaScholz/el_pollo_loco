class StatusbarBottles extends Statusbar{
    /**
     * Position of the status bar.
     * @type {number}
     */
    position_x = 20;
    position_y = 90;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];


        constructor(){
            super().loadImages(this.IMAGES);
            this.setPercentage(0);
        }
    
}