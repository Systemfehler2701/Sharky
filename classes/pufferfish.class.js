class PufferFish extends MovableObject {
    offset = { x: 5, y: 5, width: -20, height: -10 };
    transition = 0;
    deadAnimation = 0;

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];
    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ];
    IMAGES_AGGRO = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
    ]

    /**
     * Creates a new instance of PufferFish
     * 
     * @param {number} spawnArea -Area in which the PufferFish appears
     */
    constructor(spawnArea) {
        // Calls the constructor of the parent class (MovableObject)
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        // Loads the various images for animations
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_AGGRO);
        this.loadImages(this.IMAGES_DEAD);
        // Randomly sets the initial position of the PufferFish within a certain range
        this.x = 400 + Math.random() * 1400 + spawnArea * 1700;
        this.y = 20 + Math.random() * 400;
        // Sets the speed of the PufferFish to a random value
        this.speed = 0.10 + Math.random() * 0.35;
        // Starts the animation
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        let moveLeftIntervalId = this.moveLeft();
        addIntervalId(setInterval(() => {
            if (this.isDead()) {
                clearInterval(moveLeftIntervalId);
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
        if (this.deadAnimation < 3) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimation++;
        }
    }

    /**
     * animate swimming 
     */
    swimAnimation() {
        if (this.isAggro) {
            if (this.transition < 5) {
                this.playAnimation(this.IMAGES_TRANSITION);
                this.transition++;
            } else {
                this.playAnimation(this.IMAGES_AGGRO);
            }
        } else {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }
}