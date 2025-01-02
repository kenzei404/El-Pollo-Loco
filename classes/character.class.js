class Character extends MovableObject {

    y = 50;
    speed = 10;
    world;
    running_sound = new Audio('sounds/pepe_walking.wav');

    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-20.png',
    ];

    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DIES = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ]

    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.running_sound = new Audio('sounds/pepe_walking.wav');
        if (!window.allAudioObjects) {
            window.allAudioObjects = [];
        }
        window.allAudioObjects.push(this.running_sound);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DIES);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.applyGravity();
    }
    

    isColliding(mo) {
        const offsetX = 20;
        const offsetY = 100;
        const reducedWidth = 40;
        const reducedHeight = 100;
    
        const collision = (
            this.x + offsetX + (this.width - reducedWidth) > mo.x &&
            this.x + offsetX < mo.x + mo.width &&
            this.y + offsetY + (this.height - reducedHeight) > mo.y &&
            this.y + offsetY < mo.y + mo.height
        );
        return collision;
    }

    animate() {
        setInterval(() => {
            this.running_sound.pause(); // Standardmäßig pausieren
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                if (!isMuted) {
                    this.running_sound.play(); // Nur abspielen, wenn nicht gemutet
                }
                this.otherDirection = false;
            }
    
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                if (!isMuted) {
                    this.running_sound.play(); // Nur abspielen, wenn nicht gemutet
                }
                this.otherDirection = true;
            }
    
            if (this.world.keyboard.JUMP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 120;
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DIES);
            }
            if (this.isHurt() && this.y > 175) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 10);
    }
    


    jump() {
        return this.speedY = 25;
    }
};

