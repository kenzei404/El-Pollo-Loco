class Endboss extends MovableObject {

    y = 55;
    width = 300;
    height = 400;
    energy = 100;
    statusbar;
    alertSound = new Audio('sounds/boss chicken.mp3')
    dieing_sound = new Audio('sounds/endoss_dies.mp3')

    IMAGES_ALERT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ATTACK = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    hadFirstContact = false;

    constructor() {
        super().loadImage('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.statusbar = new Statusbar();
        this.energy = 100;
        this.speed = 30;
        this.x = 6000;
        this.animate();
    }

    animate() {
        let i = 0;
        this.soundPlayed = false;
    
        setInterval(() => {
            this.endbossStatus();
            const screenLength = 720;
            if (Math.abs(this.x - world.character.x) < screenLength && !this.hadFirstContact) {
                this.playAnimation(this.IMAGES_ALERT);
                this.playEnbossAlert();
                this.index = 0; 
            }
    
            if (Math.abs(this.x - world.character.x) < screenLength && !this.hadFirstContact) {
                i = 0; 
                this.hadFirstContact = true;
            }
    
            if (i > 8 && this.hadFirstContact) {
                this.playAnimation(this.IMAGES_WALKING);
                this.huntCharacter();
            }
    
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.soundPlayed && !isMuted) {
                    this.dieing_sound.play();
                    this.soundPlayed = true;
                }
                return;
            }
    
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
    
            i++;
        }, 200);
    }
    
    playEnbossAlert() {
        if (this.index == 0 && !isMuted) {
            this.alertSound.play();
        }
    }

    huntCharacter() {
        if (Math.abs(this.x - world.character.x) > 150) { 
            if (this.x > world.character.x && this.hadFirstContact && !this.isDead()) {
                this.otherDirection = false;
                this.moveLeft();
            } if (this.x < world.character.x && this.hadFirstContact && !this.isDead()) {
                this.otherDirection = true;
                this.moveRight();
            }
        } else {
            this.attackCharacter(); 
        }
    }

    attackCharacter() {
        this.playAnimation(this.IMAGES_ATTACK);
        world.character.hit(10); 
    }

    endbossStatus() {
        this.statusbar.x = this.x;
        this.statusbar.y = this.y = 50;
        this.statusbar.setPercentage(this.energy);
    }

    isColliding(mo) {
        let offsetX = 300; 
        let offsetY = 100;
        let reducedWidth = 500;
        let reducedHeight = 0;
    
        const collision = (
            this.x + offsetX + (this.width - reducedWidth) > mo.x &&
            this.x + offsetX < mo.x + mo.width &&
            this.y + offsetY + (this.height - reducedHeight) > mo.y &&
            this.y + offsetY < mo.y + mo.height
        );
        return collision;
    }
}
