class Coin extends DrawableObject {
    height = 150;
    width = 150;

    constructor(x) {
        super().loadImage(x);
        this.x = 400 + Math.random() * 5000;
    }

    isColliding(mo) {
        let offsetX = 100; 
        let offsetY = 100;
        let reducedWidth = 200;
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
