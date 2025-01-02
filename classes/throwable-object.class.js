class ThrowableObject extends MovableObject {

    glass_sound = new Audio('sounds/glas shattering.mp3');

    IMAGES_BOTTLE = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTLE_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ]

    constructor(x, y, throwableObjects) {
        super();
        this.isExploding = false;
        this.loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throwableObjects = throwableObjects;
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 90;
        this.throw();
        this.i = 0;
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        let move = () => {
            if (this.y < 320) {
                if (this.otherDirection) {
                    this.x -= 1.1;
                } else {
                    this.x += 1.1;
                }
            } else {
                this.speedY = 0;
                this.isExploding = true; // Splash-Animation starten
                this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
            }
            requestAnimationFrame(move);
        };
        move();
    
        setInterval(() => {
            if (this.y < 320) {
                this.playAnimation(this.IMAGES_BOTTLE);
            } else if (!this.isExploding) {
                this.isExploding = true;
                this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
                this.glassBreakingSound();
            }
        }, 68);
    }
    
    glassBreakingSound() {
        if (!this.soundPlayed) { // Neue Eigenschaft prüfen
            this.glass_sound.play();
            this.soundPlayed = true; // Markiert, dass der Sound abgespielt wurde
        }
    }

    playAnimationOnce(images) {
        if (this.i < images.length) {
            let path = images[this.i];
            this.img = this.imageCache[path];
            this.i++;
        } else {
            this.isExploding = false; // Splash-Animation beendet
            this.markedForDeletion = true; // Markiere das Objekt zur Entfernung
        }
    }

    triggerSplash() {
        this.isExploding = true;
        this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH); // Splash-Animation
        this.glassBreakingSound(); // Sound abspielen
        setTimeout(() => {
            this.markedForDeletion = true; // Nach Animation entfernen
        }, 300);
    }
}


