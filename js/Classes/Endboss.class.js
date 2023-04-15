class Endboss extends MoveableObject {
    height = 300;
    width = 170;
    position_y = 160;
    speed = 0.7;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.position_x = 2157; //2157 -> das Ende des Canvas
        this.animateEndboss();
    }
    

    animateEndboss() {
        this.intervalForPositionSettings();
        this.intervalForAnimation();
    }


    intervalForPositionSettings(){
        setStoppableInterval(() => {
            if (world.character.position_x > 800 && this.position_x > 1850) {
                this.moveLeft();}
            if (world.character.position_x > 800 && this.isDead()) {
                this.speed = 0;}
        }, 1000 / 60);
    }


    intervalForAnimation(){
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playImagesforAnimation(this.IMAGES_DEAD);
                this.showEndOfGame();
            } else if (world.character.position_x > 800 && this.position_x > 1850) {
                this.playImagesforAnimation(this.IMAGES_WALKING);
            } else if (world.character.position_x < 1450 && this.position_x < 1850) {
                this.playImagesforAnimation(this.IMAGES_ALERT);
            } else if (world.character.position_x > 1450 && this.position_x < 1850) {
                this.playImagesforAnimation(this.IMAGES_ATTACK);}
             if (this.isHurt()) {
                this.playImagesforAnimation(this.IMAGES_HURT);}
        }, 300);
    }


    showEndOfGame(){
        setTimeout(() => {
            showEndScreen();
            stopGame();
        }, 1500);
    }
}