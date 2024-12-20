class Statusbar extends DrawableObject {
    IMAGES_STATUSBAR = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);  // Initialer Wert der Statusleiste
    }

    setPercentage(percentage) {
        let imageIndex = this.resolveImageIndex(percentage);
        let path = this.IMAGES_STATUSBAR[imageIndex];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
