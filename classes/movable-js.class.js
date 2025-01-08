class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    i = 0;


    isColliding(mo) {
        const collision = (
            this.x + this.width > mo.x && 
            this.x < mo.x + mo.width && 
            this.y + this.height > mo.y &&
            this.y  < mo.y + mo.height      
        );
        return collision;
    }
    
    hit(x) {
        this.energy -= x;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

    }  

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 1;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 320; // Gravitation stoppt, wenn die Flasche den Boden erreicht
        } else {
            return this.y < 180; // Standard für andere Objekte
        }
    }
    

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        if (this.i < images.length) {
            let path = images[this.i];
            this.img = this.imageCache[path];
            this.i++;
            if (this.i === 1) { // Beim ersten Bild der Splash-Animation
                this.isExploding = true; // Setze den Zustand, dass die Explosion begonnen hat
            }
        }
    }
}

