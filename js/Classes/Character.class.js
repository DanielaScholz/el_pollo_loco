class Character extends MoveableObject {
    world;

    height = 280;
    width = 120;
    speed = 10;

    position_y = 80;

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

    running_audio = new Audio('audio/walking.mp3');
    jumping_audio = new Audio('audio/jumping.mp3');


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animateCharacter();
    }


    animateCharacter() {
        setInterval(() => {
            this.pepeWalkesRight();
            this.pepeWalkesLeft();
            this.pepeJumps();
            this.world.camera_x = - this.position_x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playImagesforAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playImagesforAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playImagesforAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { //Bedingung: entweder Peiltaste nach rechts oder nach links wird gedrückt, damit die Bildfolge abgespielt wird
                    //Animation beim Gehen - Bildabfolge wird in einer Schleife ausgeführt, damit sich die Beine von Pepe bewegen
                    this.playImagesforAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    //Geschwindigkeit von Pepe beim Gehen -> x-Position wird beim Pfeiltaste nach rechts drücken um 10px erhöht
    //Pepe geht nach rechts
    pepeWalkesRight() {
        //this.running_audio.pause();
        if (this.world.keyboard.RIGHT && this.position_x < this.world.level_end_position_x) {
            this.moveRight();
            this.mirroring = false;
            //this.running_audio.play();
        }
    }


    pepeWalkesLeft() {
        if (this.world.keyboard.LEFT && this.position_x > 0) {
            this.moveLeft(); //Damit Pepe nach links geht wird die x-Achse reduziert beim Pfeiltaste nach links drücken
            this.mirroring = true;
            //this.running_audio.play();
        }
    }


    pepeJumps() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.rate_of_fall = 25;
            this.jumping_audio.play();
        }
    }


}