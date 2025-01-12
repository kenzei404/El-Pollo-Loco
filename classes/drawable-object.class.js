class DrawableObject {
    x = 120;
    y = 280;
    height = 250;
    width = 150;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        // Draw the coin image
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
        // Visualize the hitbox
        ctx.beginPath();
        ctx.rect(
            this.x + 30, // Adjust according to offsetX
            this.y + 30, // Adjust according to offsetY
            this.width - 60, // Adjust according to reducedWidth
            this.height - 60 // Adjust according to reducedHeight
        );
        ctx.strokeStyle = 'red'; // Set hitbox color to red for debugging
        ctx.stroke();
    }
    
    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
