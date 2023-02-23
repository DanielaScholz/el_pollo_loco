class Coin extends MoveableObject {
    height = 100;
    width = 100;
    position_y= 300;

    IMAGES=[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animateCoins();
    }

    animateCoins(){
        setInterval(() => {
            this.playImagesforAnimation(this.IMAGES);
        }, 400);
    }


}