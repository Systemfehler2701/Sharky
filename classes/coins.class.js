class Coin extends MovableObject {
    height = 50;
    width = 50;
    offset = { x: 5, y: 5, width: -10, height: -10 };
    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    /**
     * Creates a coin instance
     * @param {number} x - The x coordinate of the coin
     * @param {number} y - The y coordinate of the coin
     */
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.name = "Coin";
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        addIntervalId(setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 100));
    }
}