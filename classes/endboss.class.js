class Endboss extends MovableObject {
    width = 400;
    height = 400;
    endbossSpawned = false;


    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SPAWNING);
        this.x = 5400;
        this.y = 0;
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (this.endbossSpawned) {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_SPAWNING);
                } else {
                    this.playAnimation(this.IMAGES_SWIMMING);
                }
                i++;
                if (i == 10) {
                    world.stopUserInput = false;
                }
            } else {
                if (world != undefined && world.character != undefined && world.character.x > 4700 && !this.endbossSpawned) {
                    world.stopUserInput = true;
                    world.ctx.translate(-250, 0);
                    this.endbossSpawned = true;
                    world.ctx.setTransform(1, 0, 0, 1, 0, 0);
                    this.moveLeft();
                }
            }
        }, 100);
    }


}