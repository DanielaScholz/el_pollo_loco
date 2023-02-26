class Coin extends MoveableObject {
    height = 140;
    width = 140;

    IMAGES=[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.position_x = (Math.random()*1701) +100;
        this.position_y = (Math.random()*51) +250;
        this.loadImages(this.IMAGES);
        this.animateCoins();
    }

    animateCoins(){
        setInterval(() => {
            this.playImagesforAnimation(this.IMAGES);
        }, 400);
    }


}