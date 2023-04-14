class Character extends MoveableObject {
    world;

    height = 280;
    width = 120;
    speed = 10;

    position_y = 100;

    offset = {
        top: 120,
        bottom: 10,
        left: 30,
        right: 30
    }

    lastMove = 0

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    jumping_audio = new Audio('audio/jumping.mp3');


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animateCharacter();
    }


    animateCharacter() {
        this.intervalForMovement();
        this.intervalForAnimation();
        this.intervalForIdleAnimation();
    }

    intervalForMovement(){
        setStoppableInterval(() => {
            this.pepeWalkesRight();
            this.pepeWalkesLeft();
            this.pepeJumps();
            this.pepeThrowBottle();
            this.world.camera_x = - this.position_x + 100;
        }, 1000 / 60);
    }

    intervalForAnimation(){
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimationPepeIsDead();
            } else if (this.isHurt()) {
                this.playImagesforAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playImagesforAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { //Bedingung: entweder Peiltaste nach rechts oder nach links wird gedrückt, damit die Bildfolge abgespielt wird
                    //Animation beim Gehen - Bildabfolge wird in einer Schleife ausgeführt, damit sich die Beine von Pepe bewegen
                    this.playImagesforAnimation(this.IMAGES_WALKING);}
            }
        }, 50);
    }


    intervalForIdleAnimation(){
        setStoppableInterval(() => {
            if (this.checkIfPepeIsInactive) {
                let timePassed = new Date().getTime() - this.lastMove;
                timePassed = timePassed / 1000;
                if (timePassed > 5) {
                    this.playImagesforAnimation(this.IMAGES_LONG_IDLE);
                } else if (timePassed > 2) {
                    this.playImagesforAnimation(this.IMAGES_IDLE);}
            }
        }, 1000)
    }


    checkIfPepeIsInactive() {
        return (
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D);
    }

    
    playAnimationPepeIsDead() {
        this.playImagesforAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            showEndScreen();
            stopGame();
        }, 2000);
    }


    //Geschwindigkeit von Pepe beim Gehen -> x-Position wird beim Pfeiltaste nach rechts drücken um 10px erhöht
    //Pepe geht nach rechts
    pepeWalkesRight() {
        if (this.world.keyboard.RIGHT && this.position_x < this.world.level_end_position_x) {
            this.moveRight();
            this.mirroring = false;
            this.lastMove = new Date().getTime();}
    }


    pepeWalkesLeft() {
        if (this.world.keyboard.LEFT && this.position_x > 0) {
            this.moveLeft(); //Damit Pepe nach links geht wird die x-Achse reduziert beim Pfeiltaste nach links drücken
            this.mirroring = true;
            this.lastMove = new Date().getTime();}
    }


    pepeJumps() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.rate_of_fall = 25;
            this.lastMove = new Date().getTime();
            if (!audioMuted) {
                this.jumping_audio.play();}
        }
    }


    pepeThrowBottle() {
        if (this.world.keyboard.D) {
            this.lastMove = new Date().getTime();}
    }

}