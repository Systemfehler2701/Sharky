class Coin extends MovableObject {
    height = 50;
    width = 50;
    offset = { x: 0, y: 0, width: -0, height: -0 };
    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.name = "Coin";
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 100);
    }
}