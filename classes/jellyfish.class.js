class JellyFish extends MovableObject {
    offset = { x: 5, y: 10, width: -10, height: -20 };
    deadAnimation = 0;

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

    /**
     * Creates a new instance of JellyFish
     * 
     * @param {number} spawnArea -Area in which the JellyFish appears
     */
    constructor(spawnArea) {
        // Calls the constructor of the parent class (MovableObject)
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_AGGRO);
        this.loadImages(this.IMAGES_DEAD);
        // Randomly sets the initial position of the PufferFish within a certain range
        this.x = 300 + Math.random() * 1400 + spawnArea * 1700;
        this.y = 20 + Math.random() * 350;
        // Sets the speed of the PufferFish to a random value
        this.speed = 0.10 + Math.random() * 0.50;
        // Starts the animation
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        let moveSinusIntervalId = this.moveSinus();
        addIntervalId(setInterval(() => {
            if (this.isDead()) {
                clearInterval(moveSinusIntervalId);
                this.dyingAnimation();
            } else
                this.swimAnimation();
        }, 100));
    }

    /**
     * animate dying 
     */
    dyingAnimation() {
        if (this.deadAnimation == 0) {
            this.moveUp();
        }
        if (this.deadAnimation < 4) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimation++;
        }
    }

    /**
     * animate swimming 
     */
    swimAnimation() {
        if (this.isAggro) {
            this.playAnimation(this.IMAGES_AGGRO);
        } else {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }
}