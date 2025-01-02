class SmallChicken extends MovableObject{

    energy = 100;
    height = 70;
    width = 70;
    y = 350;

    chickenDeadSound = new Audio('sounds/small chick dead.mp3') 

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png']



    constructor(){
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1000 + Math.random() * 3000;
        this.speed = 2.5 + Math.random() * 0.25;
        this.animate();
        this.index = 0;
    };

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft(); // Nur bewegen, wenn das Huhn nicht tot ist
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead()) {
                if(!isMuted) {
                this.playSmallDeadChickenSound();}
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
    
    playSmallDeadChickenSound() {
        if(this.index == 0) {
        this.chickenDeadSound.play();
        }
    }
    
}