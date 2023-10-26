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
    endbossSwimming = false; //Schwimmanimation wird ausgeführt
    spawnAnimationCounter = 0; //Zählt die Bewegungen der Kamera
    offset = { x: 30, y: 200, width: -65, height: -270 };
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
        this.x = this.endbossSpawn_x;
        this.y = this.endbossSpawn_y;
        this.name = "Endboss";
        this.animate();
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

    spawnEndboss(i) {
        if (i < 10) {
            this.playAnimation(this.IMAGES_SPAWNING);
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
                this.endbossSwimming = true;
                this.moveLeft();
                world.stopUserInput = false;
                clearInterval(interval);
            }
        }, 1000 / 60);
    }

    animate() {
        let i = 0;
        addIntervalId(setInterval(() => {
            if (this.endbossTrigger) {
                if (this.endbossCameraRight) {
                    this.endbossCameraRight = false;
                    setTimeout(() => this.cameraMoveRight(world.character.speed), 250);
                }
                if (this.endbossSpawning) {
                    this.spawnEndboss(i);
                    i++;
                }
                if (this.endbossCameraLeft) {
                    this.endbossCameraLeft = false;
                    setTimeout(() => this.cameraMoveLeft(world.character.speed), 250);
                }
                if (this.endbossSwimming) {
                    this.playAnimation(this.IMAGES_SWIMMING);
                }
            } else {
                this.triggerEndboss();
            }
        }, 100));
    }
}