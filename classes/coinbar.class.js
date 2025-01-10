class Coinbar extends DrawableObject {

    IMAGES_COINBAR = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    percentage = 0;
    ImagePath;

    constructor() {
        super().loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGES_COINBAR);
        this.loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.y = 45;
        this.x = 20;
        this.height = 50;
        this.width = 180;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINBAR[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    resolvePercentage() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }
    }
}
