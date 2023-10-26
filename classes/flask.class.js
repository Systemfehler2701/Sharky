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

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_FLASK);
        this.x = x;
        this.y = y;
        this.name = "Flask";
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_FLASK);
        }, 100);
    }
}