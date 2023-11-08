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

    constructor() {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.endbossSpawn_x;
        this.y = this.endbossSpawn_y;
        this.energy = 10;
        this.animate();
    }


    animate() {
        addIntervalId(setInterval(() => {
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
        }, 100));
        addIntervalId(setInterval(() => {
            if (Endboss.endbossSwimming) {
                this.endbossAttack = true;
            }
        }, 3000));
    }


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


    endbossDying() {
        Endboss.endbossSwimming = false;
        Endboss.endbossDead = true;
        clearInterval(this.moveLeftIntervalId);
        if (this.deadAnimation == 0) {
            this.moveUp();
        }
        if (this.deadAnimation < 5) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimation++;
        }
        if (this.y < -30) {
            stopGame();
        }
    }

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

    moveCamera(cameraLeftOrRight) {
        world.camera_x += cameraLeftOrRight;
    }


    triggerEndboss() {
        if (world != undefined && world.character != undefined && world.character.x > this.endbossSpawn_x_Trigger && !this.endbossTrigger) {
            world.stopUserInput = true;
            this.endbossTrigger = true;
            this.endbossCameraRight = true;
        }
    }


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


    spawnEndboss() {
        if (this.spawnAnimation < 10) {
            this.playAnimation(this.IMAGES_SPAWNING);
            this.spawnAnimation++;
        } else {
            this.endbossSpawning = false;
            this.endbossCameraLeft = true;
        }
    }


    cameraMoveLeft(moveCamera_x) {
        this.endbossCameraLeft = false;
        let interval = setInterval(() => {
            this.moveCamera(moveCamera_x);
            this.spawnAnimationCounter--;
            if (this.spawnAnimationCounter == 0) {
                Endboss.endbossSwimming = true;
                this.moveLeftIntervalId = this.moveLeft();
                world.stopUserInput = false;
                clearInterval(interval);
            }
        }, 1000 / 60);
    }


    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);

    }
}