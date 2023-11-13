class Flask extends MovableObject {
    height = 80;
    width = 60;
    offset = { x: 10, y: 35, width: -20, height: -38 };
    IMAGES_FLASK = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    /**
     * Creates a Flask instance with the given coordinates
     * @param {number} x - The x coordinate of the Flask
     * @param {number} y - The y coordinate of the Flask
     */
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_FLASK);
        this.x = x;
        this.y = y;
        this.name = "Flask";
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        addIntervalId(setInterval(() => {
            this.playAnimation(this.IMAGES_FLASK);
        }, 100));
    }
}