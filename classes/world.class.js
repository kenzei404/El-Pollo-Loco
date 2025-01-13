class World {
    character = new Character();
    coinSound = new Audio('sounds/coinSound.mp3');
    game_sound = new Audio('sounds/242088_4401185-lq.mp3');
    glass_sound = new Audio('sounds/glas shattering.mp3');
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
    endTime = null;
    isGameOverTriggered = false;
    isWon;

    constructor(canvas, keyboard) {
        this.isGameOver = false; 
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startTime = Date.now(); 
        this.collectedCoins = 0;
        this.totalCoins = this.level.coins.length;
        this.draw();
        this.setWorld();
        this.run();
    };

    endGame() {
        this.isGameOver = true;
    }

    getElapsedTime() {
        const endTime = this.endTime ? this.endTime : Date.now();
        const elapsedTime = (endTime - this.startTime) / 1000; 
        return elapsedTime.toFixed(2);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionWithEndboss();
            this.checkThrow();
            this.gameOver();
            this.checkEndbossHit();
            this.gameSound();
            this.checkThrowableObjectCollision();
        }, 200);
    
        setInterval(() => {
            this.collectCoins();
            this.collectBottles();
            this.checkCollisionWithEnemys();
        }, 20);
    }

    gameSound() {
        if (!isMuted) {
            this.game_sound.play();
        } else {
            this.game_sound.pause();
            this.game_sound.currentTime = 0;
        }
    }

    handleGameOver(isWin) {
        this.isGameOverTriggered = true; 
        this.endTime = Date.now();
        setTimeout(() => {
            if (isWin) {
                this.gameOverScreen = new YouWin(this.canvas.width / 2, this.canvas.height / 2);
                this.isWon = true;
            } else {
                this.gameOverScreen = new GameOver(this.canvas.width / 2, this.canvas.height / 2);
                this.isWon = false;
            }
        }, 500);
        setTimeout(() => {
            this.endGame(); 
            this.showEndScreen(isWin); 
        }, 5000);
    }
    
    gameOver() {
        if (this.isGameOverTriggered) return;
    
        if (this.character.isDead()) {
            this.handleGameOver(false);
        }
    
        if (this.level.endboss.isDead()) {
            this.handleGameOver(true);
        }
    }

    showEndScreen(isWin) {
        if (this.isWon && Math.round((this.coinArr / this.totalCoins) * 100) === 100) {
            this.record();
        }
        const coinPercentage = Math.round((this.coinArr / this.totalCoins) * 100);
        const elapsedTime = this.getElapsedTime();
        const record = JSON.parse(localStorage.getItem('record'));
        this.clearScreen();
        this.displayTitle(isWin);
        this.displayStats(coinPercentage, elapsedTime);
        this.displayRecord(record);
        this.displayRestartInstructions();
    }
    

    displayRestartInstructions() {
        let ctx = this.ctx;
        ctx.fillText('Do you want to play again?', this.canvas.width / 2, 420);
        ctx.fillText('Press "R" on PC or "Reset" on Mobile to Restart', this.canvas.width / 2, 460);
    }

    displayRecord(record) {
        let ctx = this.ctx;
        ctx.font = '20px MexicanFont';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        if (record) {
            ctx.fillText(`Best Record:`, this.canvas.width / 2, 300);
            ctx.fillText(`Coins: ${record.coinPercentage}%`, this.canvas.width / 2, 330);
            ctx.fillText(`Time: ${record.elapsedTime} seconds`, this.canvas.width / 2, 360);
        } else {
            ctx.fillText(`No record yet.`, this.canvas.width / 2, 300);
        }
        ctx.fillText(`* 100% of coins are required to set a record *`, this.canvas.width / 2, 400);
    }
    

    displayStats(coinPercentage, elapsedTime) {
        let ctx = this.ctx;
        ctx.font = '20px MexicanFont';
        ctx.fillText(`Coins Collected: ${coinPercentage}%`, this.canvas.width / 2, 200);
        ctx.fillText(`Time Played: ${elapsedTime} seconds`, this.canvas.width / 2, 250);
    }
    
    displayTitle(isWin) {
        let ctx = this.ctx;
        ctx.fillStyle = 'white';
        ctx.font = '64px MexicanFont';
        ctx.textAlign = 'center';
        let title = isWin ? 'You Win!' : 'You Lost!';
        ctx.fillText(title, this.canvas.width / 2, 100);
    }
    
    clearScreen() {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    record() {
        let coinPercentage = Math.round((this.coinArr / this.totalCoins) * 100);
        let elapsedTime = this.getElapsedTime();
        let record = localStorage.getItem('record');

        if (coinPercentage === 100) {
            if (!record) {
                record = {
                    coinPercentage: coinPercentage,
                    elapsedTime: elapsedTime
                };
            } else {
                record = JSON.parse(record);
                if (coinPercentage === 100 && elapsedTime < record.elapsedTime) {
                    record.coinPercentage = coinPercentage;
                    record.elapsedTime = elapsedTime;
                }
            }
            localStorage.setItem('record', JSON.stringify(record));
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

    checkThrowableObjectCollision() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy) && !throwableObject.isExploding && !enemy.isDead()) {
                    enemy.hit(100);
                    if (enemy.isDead()) enemy.loadImage(enemy.IMAGE_DEAD);
                    throwableObject.triggerSplash();
                }
            });
            if (throwableObject.isColliding(this.level.endboss) && !throwableObject.isExploding) {
                this.level.endboss.hit(10); 
                this.level.endbossStatusbar.setPercentage(this.level.endboss.energy);
                throwableObject.triggerSplash();
            }
            if (throwableObject.markedForDeletion) {
                this.throwableObjects.splice(index, 1);
            }
        });
    }
    
    collectCoins() {
        let totalCoins = this.level.coins.length + this.coinArr;
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (coin instanceof Coin && coin.isColliding(this.character)) {
                if (!isMuted) {
                    this.coinSound.play();
                }
                this.coinArr++;
                this.level.coins.splice(i, 1);
                let newPercentage = (this.coinArr / totalCoins) * 100;
                this.coinbar.setPercentage(newPercentage);
                break;
            }
        }
    }
    
    collectBottles() {
        let totalBottles = this.level.bottles.length + this.bottleArr;
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (bottle instanceof Bottle && this.character.isColliding(bottle)) { // Sicherstellen, dass es ein Bottle-Objekt ist
                this.bottleArr++;
                this.level.bottles.splice(i, 1); // Entferne die Flasche aus dem Level
                let newPercentage = (this.bottleArr / totalBottles) * 100;
                this.bottlebar.setPercentage(newPercentage); // Aktualisiere die Anzeige
                break;
            }
        }
    }
    

    checkEndbossHit() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.y < 320 && this.level.endboss.isColliding(throwableObject)) {
                this.level.endboss.hit(5);
                this.level.endboss.isHurt();
                this.level.endbossStatusbar.setPercentage(this.level.endboss.energy);
            }
        });
    }

    checkCollisionWithEndboss() {
        if (this.isGameOverTriggered) return;
    
        if (this.character.isColliding(this.level.endboss)) {
            if (this.level.endboss.isDangerous) {
                this.character.hit(5);
                this.character.isHurt();
                this.statusbar.setPercentage(this.character.energy);
            }
        }
    }

    checkCollisionWithEnemys() {
        if (this.isGameOverTriggered) return;
    
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
                        this.character.hit(3);
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
        if (this.isGameOver) {
            return; 
        }
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
        if (!this.isGameOver) {
            requestAnimationFrame(() => this.draw());
        }
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
