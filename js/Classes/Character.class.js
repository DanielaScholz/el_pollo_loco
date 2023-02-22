class Character extends MoveableObject {
    world;

    height = 280;
    width = 120;
    speed = 10;

    position_y = 80;
    rate_of_fall = 0; //Fallgeschwindigkeit ->speedY
    acceleration = 3; //Beschleunigung

    WALKING_IMAGES = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    JUMPING_IMAGES = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    HURT_IMAGES = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    DEAD_IMAGES = [
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
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.JUMPING_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.applyGravity();
        this.animateCharacter();
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.rate_of_fall > 0) {
                this.position_y -= this.rate_of_fall;
                this.rate_of_fall -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.position_y < 180;
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
                this.playImagesforAnimation(this.DEAD_IMAGES);
            } else if (this.isHurt()) {
                this.playImagesforAnimation(this.HURT_IMAGES);
            } else if (this.isAboveGround()) {
                this.playImagesforAnimation(this.JUMPING_IMAGES);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { //Bedingung: entweder Peiltaste nach rechts oder nach links wird gedrückt, damit die Bildfolge abgespielt wird
                    //Animation beim Gehen - Bildabfolge wird in einer Schleife ausgeführt, damit sich die Beine von Pepe bewegen
                    this.playImagesforAnimation(this.WALKING_IMAGES);
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