class StatusbarEndboss extends Statusbar {
    /**
     * Position of the status bar.
     * @type {number}
     */
    position_x = 490;
    position_y = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    constructor() {
        super().mirrorStatusbar();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }


    mirrorStatusbar() {
        this.mirroring = true;
    }
}