class StatusBar extends DrawableObject {

    IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/10_  copia.png',
        'img/4. Marcadores/orange/20_  copia.png',
        'img/4. Marcadores/orange/30_  copia.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/50_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/70_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/90_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 0;
        this.width = 220;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 10;
        } else if (this.percentage == 90) {
            return 9;
        } else if (this.percentage == 80) {
            return 8;
        } else if (this.percentage == 70) {
            return 7;
        } else if (this.percentage == 60) {
            return 6;
        } else if (this.percentage == 50) {
            return 5;
        } else if (this.percentage == 40) {
            return 4;
        } else if (this.percentage == 30) {
            return 3;
        } else if (this.percentage == 20) {
            return 2;
        } else if (this.percentage == 10) {
            return 1;
        } else {
            return 0;
        }
    }
}