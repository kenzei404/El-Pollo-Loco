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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //this.drawBoundingBox(ctx);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawBoundingBox(ctx) {
        ctx.strokeStyle = 'red';  // Wähle eine auffällige Farbe für den Umriss
        ctx.strokeRect(this.x, this.y, this.width, this.height);  // Zeichne ein Rechteck um das Drawable Object
    }
}
