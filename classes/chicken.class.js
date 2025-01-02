class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 350;
    energy = 100;
    deadChickenSound = new Audio('sounds/jumpeChicken.mp3')

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png']

constructor() {
    super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 1000 + Math.random() * 3000;
    this.speed = 2 + Math.random() * 0.25;
    if (!window.allAudioObjects) {
        window.allAudioObjects = [];
    }
    window.allAudioObjects.push(this.deadChickenSound); // Registrierung
    this.animate();
    this.index = 0;
}


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead() ) {
                this.playDeadChickenSound();
                this.loadImage(this.IMAGE_DEAD);
                this.index++;
            } else {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 120 + Math.random() * 10);
    }

    playDeadChickenSound() {
        if (this.index === 0 && !isMuted) { // Nur abspielen, wenn nicht gemutet
            this.deadChickenSound.play();
        }
    }
}