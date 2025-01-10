class Coin extends DrawableObject {
    height = 150;
    width = 150;

    constructor(x) {
        super().loadImage(x);
        this.x = 400 + Math.random() * 3000;
    }

    isColliding(mo) {
        const offsetX = 50;
        const offsetY = 50;
        const reducedWidth = 100;
        const reducedHeight = 0;

        const collision = (
            this.x + offsetX + (this.width - reducedWidth) > mo.x &&
            this.x + offsetX < mo.x + mo.width &&
            this.y + offsetY + (this.height - reducedHeight) > mo.y &&
            this.y + offsetY < mo.y + mo.height
        );
        return collision;
    }

}
