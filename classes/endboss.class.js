class Endboss extends MovableObject {
    world;
    width = 400;
    height = 400;
    endbossSpawn_x = 5400;
    endbossSpawn_y = 0;
    endbossSpawn_x_Trigger = 4700;
    endbossTrigger = false; //Einleitung für Endbossanimation
    endbossCameraRight = false; //Kamera Bewegung nach rechts wird ausgeführt
    endbossCameraLeft = false; //Kamera Bewegung nach links wird ausgeführt 
    endbossSpawning = false; //Einleitung für Endbossspawn
    endbossAttack = false;
    attackAnimation = 0;
    spawnAnimation = 0;
    deadAnimation = 0;
    static endbossDead = false;
    static endbossSwimming = false; //Schwimmanimation wird ausgeführt
    spawnAnimationCounter = 0; //Zählt die Bewegungen der Kamera
    offset = { x: 30, y: 200, width: -65, height: -270 };
    moveLeftIntervalId;

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
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ]
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ]
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ]

    /**
     * Creates a new instance of Endboss
     */
    constructor() {
        // Calls the constructor of the parent class (MovableObject)
        super().loadImage(this.IMAGES_SPAWNING[0]);
        // Loads the various images for animations
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.endbossSpawn_x;
        this.y = this.endbossSpawn_y;
        // Sets the character's energy to 10
        this.energy = 10;
        // Starts the animation
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        addIntervalId(setInterval(() => {
            this.animateEndboss();
        }, 100));
        addIntervalId(setInterval(() => {
            if (Endboss.endbossSwimming) {
                this.endbossAttack = true;
            }
        }, 3000));
    }

    /**
     * animed the endboss
     * 
     * @returns 
     */
    animateEndboss() {
        if (this.endbossAttack) {
            this.performAttack();
            return;
        }
        if (this.isHurt()) {
            this.hurtAnimation();
            return;
        }
        if (this.isDead()) {
            this.endbossDying();
        }
        if (this.endbossTrigger) {
            this.endbossSpawnScene();
        } else {
            this.triggerEndboss();
        }
    }

    /**
     * 
     */
    performAttack() {
        if (this.attackAnimation < 6) {
            this.x -= 25;
            this.playAnimation(this.IMAGES_ATTACK);
            this.attackAnimation++;
        } else {
            this.attackAnimation = 0;
            this.endbossAttack = false;
        }
    }

    /**
     * show gameOver screen
     */
    endbossDying() {
        Endboss.endbossSwimming = false;
        Endboss.endbossDead = true;
        clearInterval(this.moveLeftIntervalId);
        this.dyingAnimation();
        setTimeout(() => {
            stopGame();
            renderGameOver('win');
        }, 3000);
    }


    /**
     * This function gives the dying animation
     */
    dyingAnimation() {
        if (this.deadAnimation == 0) {
            this.moveUp();
        }
        if (this.deadAnimation < 5) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimation++;
            BACKGROUND_MELODY.pause();
            WIN_SOUND.play();
        }
    }

    /**
     * spwan scene for endboss
     */
    endbossSpawnScene() {
        if (this.endbossCameraRight) {
            this.endbossCameraRight = false;
            setTimeout(() => this.cameraMoveRight(world.character.speed), 250);
        }
        if (this.endbossSpawning) {
            this.spawnEndboss();
        }
        if (this.endbossCameraLeft) {
            this.endbossCameraLeft = false;
            setTimeout(() => this.cameraMoveLeft(world.character.speed), 250);
        }
        if (Endboss.endbossSwimming) {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }

    /**
     * Moves the camera on the X axis
     * 
     * @param {number} cameraLeftOrRight - The amount the camera is moved
     */
    moveCamera(cameraLeftOrRight) {
        world.camera_x += cameraLeftOrRight;
    }

    /**
     * Initializes the spawn animation for the final boss
     */
    triggerEndboss() {
        if (world != undefined && world.character != undefined && world.character.x > this.endbossSpawn_x_Trigger && !this.endbossTrigger) {
            world.stopUserInput = true;
            this.endbossTrigger = true;
            this.endbossCameraRight = true;
        }
    }

    /**
     * Move the camera to the right before the final boss appears
     * 
     * @param {number} moveCamera_x - The amount the camera is moved
     */
    cameraMoveRight(moveCamera_x) {
        let interval = setInterval(() => {
            if (world.camera_x > world.level.cameraEnd_x + moveCamera_x) {
                this.moveCamera(-moveCamera_x);
                this.spawnAnimationCounter++;
            } else {
                this.endbossSpawning = true;
                clearInterval(interval);
            }
        }, 1000 / 60);
    }

    /**
     * spawn animation endbos
     */
    spawnEndboss() {
        if (this.spawnAnimation < 10) {
            this.playAnimation(this.IMAGES_SPAWNING);
            this.spawnAnimation++;
        } else {
            this.endbossSpawning = false;
            this.endbossCameraLeft = true;
        }
    }

    /**
     * Move the camera to the left after the final boss appears
     * 
     * @param {number} moveCamera_x - The amount the camera is moved
     */
    cameraMoveLeft(moveCamera_x) {
        this.endbossCameraLeft = false;
        let interval = setInterval(() => {
            this.moveCamera(moveCamera_x);
            this.spawnAnimationCounter--;
            if (this.spawnAnimationCounter == 0) {
                Endboss.endbossSwimming = true;
                this.moveLeftIntervalId = this.moveEndboss();
                world.stopUserInput = false;
                clearInterval(interval);
            }
        }, 1000 / 60);
    }

    /**
     * Starts the final boss's movement to the left, taking into account the character's vertical position
     * 
     * @returns {number} - The ID of the interval for the final boss movement
     */
    moveEndboss() {
        return addIntervalId(setInterval(() => {
            this.x -= this.speed;
            if (this.y + this.offset.y + 30 < world.character.y + world.character.offset.y) {
                this.y += 3;
            } else if (this.y + this.offset.y + 10 > world.character.y + world.character.offset.y) {
                this.y -= 3;
            }
        }, 1000 / 60));
    }

    /**
     * Starts the final boss's hurt animation
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);

    }
}