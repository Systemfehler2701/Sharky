class JellyFish extends MovableObject {
    offset = { x: 5, y: 10, width: -10, height: -20 };

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    IMAGES_AGGRO = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];

    constructor(spawnArea) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_AGGRO);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1400 + spawnArea * 1700;
        this.y = 20 + Math.random() * 350;
        this.speed = 0.10 + Math.random() * 0.50;
        this.animate();
    }
    animate() {
        let deadAnimation = 0;
        let moveSinusIntervalId = this.moveSinus();
        addIntervalId(setInterval(() => {
            if (this.energy <= 0) {
                clearInterval(moveSinusIntervalId);
                if (deadAnimation == 0) {
                    this.moveUp();
                }
                if (deadAnimation < 4) {
                    this.playAnimation(this.IMAGES_DEAD);
                    deadAnimation++;
                }
            } else if (this.isAggro) {
                this.playAnimation(this.IMAGES_AGGRO);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 100));
    }

}