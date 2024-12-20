class Cloud extends MovableObject {

    width = 400;
    height = 250;
    y = 50;

    constructor() {
        super().loadImage("img_pollo_locco/img/5_background/layers/4_clouds/1.png");
        this.x = 200 + Math.random() * 3000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 15)
    }
}