class StatusbarHealth extends Statusbar{
    position_x = 20;
    position_y= 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // Index 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // Index 5 
    ]

       constructor(){
        super().loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}