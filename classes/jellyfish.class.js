class JellyFish extends MovableObject {

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 250 + Math.random() * 500;
        this.y = 20 + Math.random() * 350;
        this.speed = 0.15 + Math.random() * 0.50;
        this.animate();
    }
    animate() {
        this.moveSinus();
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);
    }

}