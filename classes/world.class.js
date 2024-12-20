class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    pov = 720;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    throwableObjects = [];
    coinArr = 0;
    bottleArr = 0;
    coin;
    throwedObjects = 0;
    gameOverScreen = null;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionWithEndboss();
            this.checkThrow();
            this.gameOver();
            this.checkEndbossHit();

        }, 200);
        setInterval(() => {
            this.collectCoins();
            this.collectBottles();

            this.checkCollisionWithEnemys();

        }, 20);
    }

    gameOver() {
        if (this.character.isDead()) {
            setTimeout(() => {
                this.gameOverScreen = new GameOver(this.canvas.width / 2, this.canvas.height / 2);
            }, 2000);
            setTimeout(()=>{
                location.reload();
            }, 6000);
        } 
        if (this.level.endboss.isDead()) {
            setTimeout(() => {
                this.gameOverScreen = new YouWin(this.canvas.width / 2, this.canvas.height / 2);
            }, 2000);
            setTimeout(()=>{
                location.reload();
            }, 6000);
        }
    }
    
    checkThrow() {
        if (this.keyboard.THROW && this.bottleArr > 0) {
            let bottle = new ThrowableObject(this.character.x + 90, this.character.y + 100, this.throwableObjects.length);
            bottle.otherDirection = this.character.otherDirection;
            this.throwableObjects.push(bottle);
            this.bottleArr--;
            this.throwedObjects++;
            let totalBottles = this.level.bottles.length + this.bottleArr;
            let newPercentage = (this.bottleArr / (totalBottles + this.throwedObjects)) * 100;
            this.bottlebar.setPercentage(newPercentage);
        }
    }
    
    collectCoins() {
        let totalCoins = this.level.coins.length + this.coinArr;
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.coinArr++;
                this.level.coins.splice(i, 1)
                let newPercentage = (this.coinArr / totalCoins) * 100;
                this.coinbar.setPercentage(newPercentage);
                break;
            }
        }
    }

    collectBottles() {
        let totalBottles = this.level.bottles.length + this.bottleArr;
        for (let i = 0; i < this.level.bottles.length; i++) {
            if (this.character.isColliding(this.level.bottles[i])) {
                this.bottleArr++;
                this.level.bottles.splice(i, 1)
                let newPercentage = (this.bottleArr / totalBottles) * 100;
                this.bottlebar.setPercentage(newPercentage);
                break;
            }
        }
    }

    checkEndbossHit() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.y < 320 && this.level.endboss.isColliding(throwableObject)) {
                this.level.endboss.hit(10);
                this.level.endboss.isHurt();
                this.level.endbossStatusbar.setPercentage(this.level.endboss.energy);
            }
        });
    }
    

    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit(5);
            this.character.isHurt();
            this.statusbar.setPercentage(this.character.energy)
        };
    }

    checkCollisionWithEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.isJumpingOnTopOfEnemy(this.character, enemy)) {
                    enemy.hit(100);
                    this.character.speedY = 20;
    
                    if (enemy.isDead()) {
                        enemy.loadImage(enemy.IMAGE_DEAD); 
                        enemy.isDangerous = false;
                    }
                } else {
                    if (enemy.isDangerous !== false) {
                        this.character.hit(1);
                        this.character.isHurt();
                        this.statusbar.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }

    isJumpingOnTopOfEnemy(character, enemy) {
        return character.y + character.height < enemy.y + enemy.height &&
            character.speedY < 0;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.level.endboss);
        this.addToMap(this.level.endboss.statusbar);
        this.ctx.translate(-this.camera_x, 0);
        if (this.gameOverScreen) {
            this.gameOverScreen.draw(this.ctx);
        }
    
        // Selbstverweis (für Animation Loop)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    };

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
  

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 
