class BackgroundObject extends MovableObject {

    width = 720;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = 480;
    }

}