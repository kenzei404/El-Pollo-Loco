class ThrowableObject extends MovableObject {
    glass_sound = new Audio('sounds/glas shattering.mp3');

    IMAGES_BOTTLE = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirection) {
        super();
        this.isExploding = false;
        this.soundPlayed = false;
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 90;
        this.otherDirection = otherDirection;
        this.speedY = 20;
        this.applyGravity();
        this.throw();
        this.i = 0;
    }

    throw() {
        const move = () => {
            if (this.y >= 320) {
                this.triggerSplash();
                return;
            }
            if (!this.isExploding) {
                this.x += this.otherDirection ? -1.1 : 1.1;
            }
            if (this.isExploding) {
                this.speedY = 0;
            }
            requestAnimationFrame(move);
        };
        move();
    
        setInterval(() => {
            if (this.y < 320 && !this.isExploding) {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 108);
    }

    triggerSplash() {
        if (!this.isExploding) {
            this.isExploding = true;
            this.speedY = 0;
            this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
            this.glassBreakingSound(); 
        }
    }

    glassBreakingSound() {
        if (!this.soundPlayed && !isMuted) {
            this.glass_sound.play();
            this.soundPlayed = true; 
        }
    }

    playAnimationOnce(images) {
        if (this.i < images.length) {
            let path = images[this.i];
            this.img = this.imageCache[path];
            this.i++;
            setTimeout(() => this.playAnimationOnce(images), 108);
        } else {
            this.markedForDeletion = true; 
        }
    }

    isColliding(mo) {
        let offsetX = 100; 
        let offsetY = 100;
        let reducedWidth = 100;
        let reducedHeight = 100;
    
        const collision = (
            this.x + offsetX + (this.width - reducedWidth) > mo.x &&
            this.x + offsetX < mo.x + mo.width &&
            this.y + offsetY + (this.height - reducedHeight) > mo.y &&
            this.y + offsetY < mo.y + mo.height
        );
        return collision;
    }
    
}
