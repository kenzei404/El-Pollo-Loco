class Character extends MovableObject {

    y = 50;
    speed = 10;
    world;
    running_sound = new Audio('sounds/pepe_walking.wav');
    isIdleActive = false;


    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE_SHORT = [
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

    ];

    IMAGES_IDLE_LONG = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
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
        super().loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.running_sound = new Audio('sounds/pepe_walking.wav');
        if (!window.allAudioObjects) {
            window.allAudioObjects = [];
        }
        window.allAudioObjects.push(this.running_sound);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DIES);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
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
            this.running_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.isIdleActive = false;
                this.moveRight();
                if (!isMuted) {
                    this.running_sound.play();
                }
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.isIdleActive = false;
                this.moveLeft();
                if (!isMuted) {
                    this.running_sound.play();
                }
                this.otherDirection = true;
            }
            if (this.world.keyboard.JUMP && !this.isAboveGround()) {
                this.isIdleActive = false;
                this.jump();
            }
            this.world.camera_x = -this.x + 120;
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isAboveGround()) {
                this.isIdleActive = false;
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.startIdleAnimation();
                this.isIdleActive = true;

            } else {
                this.isIdleActive = false;
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DIES);
                this.isIdleActive = false;
            }
            if (this.isHurt() && this.y > 175) {
                this.playAnimation(this.IMAGES_HURT);
                this.isIdleActive = false;
            }
        }, 1000 / 10);
    }
    
    jump() {
        return this.speedY = 25;
    }

    startIdleAnimation() {
        if (!this.isIdleActive && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.isIdleActive = true;
    
            // Starte die kurze Idle-Animation für 10 Sekunden
            this.idleInterval = setInterval(() => {
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_IDLE_SHORT);
                } else {
                    this.stopIdleAnimation(); // Bewegung stoppt alles
                }
            }, 150); // Zeit pro Frame (entsprechend der Animationsgeschwindigkeit)
    
            // Nach 10 Sekunden zur langen Idle-Animation wechseln
            this.idleTimeout = setTimeout(() => {
                clearInterval(this.idleInterval); // Stoppe die kurze Animation
                this.startLongIdleAnimation();   // Starte die lange Animation
            }, 7000); // 10 Sekunden
        }
    }
    
    startLongIdleAnimation() {
        this.idleInterval = setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else {
                this.stopIdleAnimation(); // Bewegung stoppt alles
            }
        }, 150); // Zeit pro Frame (entsprechend der Animationsgeschwindigkeit)
    }
    
    stopIdleAnimation() {
        // Stoppe das Timeout für den Übergang zur langen Animation
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
    
        // Stoppe das Intervall der laufenden Animation
        if (this.idleInterval) {
            clearInterval(this.idleInterval);
            this.idleInterval = null;
        }
    
        this.isIdleActive = false; // Setze den Zustand zurück
    }
    
    playAnimationOnce(images, callback) {
        let index = 0;
        let interval = setInterval(() => {
            if (index < images.length) {
                this.img = this.imageCache[images[index]];
                index++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 150); 
    }

};
