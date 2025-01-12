class Coin extends DrawableObject {
    height = 150;
    width = 150;

    constructor(x) {
        super().loadImage(x);
        this.x = 400 + Math.random() * 5000;
    }

    isColliding(mo) {
        const offsetX = 30;
        const offsetY = 30;
        const reducedWidth = 60;
        const reducedHeight = 60;
    
        console.log(`Checking collision: Coin (${this.x}, ${this.y}) vs Object (${mo.x}, ${mo.y})`);
        
        const collision = (
            this.x + offsetX + (this.width - reducedWidth) > mo.x &&
            this.x + offsetX < mo.x + mo.width &&
            this.y + offsetY + (this.height - reducedHeight) > mo.y &&
            this.y + offsetY < mo.y + mo.height
        );
    
        console.log(`Collision result: ${collision}`);
        return collision;
    }
}
