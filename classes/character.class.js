class Character extends MovableObject {
    width = 250;
    height = 250;
    speed = 7;
    idleTime = new Date().getTime();
    x = 100;
    y = 100;
    world;
    offset = { x: 55, y: 130, width: -110, height: -190 };
    lastShoot = 0;
    shootImg = 0;
    bubbleType;
    deadAnimation = 0;

    IMAGES_STAYING = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]
    IMAGES_SLEEPING = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ]
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_BUBBLE_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];
    IMAGES_ATTACK_WHALE = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];
    IMAGES_POISON = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_SHOCK = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];
    IMAGES_POISON_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_SHOCK_DEAD = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];

    /**
     * Creates a new instance of character
     */
    constructor() {
        // Calls the constructor of the parent class (MovableObject)
        super().loadImage('img/1.Sharkie/1.IDLE/1.png', );
        // Loads the various images for animations
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_STAYING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_ATTACK_WHALE);
        this.loadImages(this.IMAGES_POISON);
        this.loadImages(this.IMAGES_SHOCK);
        this.loadImages(this.IMAGES_POISON_DEAD);
        this.loadImages(this.IMAGES_SHOCK_DEAD);
        // Sets the character's energy to 5
        this.energy = 5;
        // Starts the animation
        this.animate();
    }

    /**
     * This function animate the object
     */
    animate() {
        addIntervalId(setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60));

        addIntervalId(setInterval(() => {
            this.animedCharacter();
        }, 180));
        addIntervalId(setInterval(() => {
            if (this.isShooting()) {
                this.bubbleAttack();
            }
        }, 90));
    }

    /**
     * This function move the character
     */
    moveCharacter() {
        if (this.world.stopUserInput) {
            this.world.keyboard.LEFT = this.world.keyboard.RIGHT = this.world.keyboard.UP = this.world.keyboard.DOWN = this.world.keyboard.D = this.world.keyboard.SPACE = false;
            return;
        }
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterMoveUp();
        this.characterMoveDown();
        this.cameraFocusCharacter();
        this.cameraEnd();
        this.characterAttack();
    }

    /**
     * character move right
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * character move left
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    /**
     * character move up
     */
    characterMoveUp() {
        if (this.world.keyboard.UP && this.y > -100) {
            this.y -= this.speed;
        }
    }

    /**
     * character move down
     */
    characterMoveDown() {
        if (this.world.keyboard.DOWN && this.y < 260) {
            this.y += this.speed;
        }
    }

    /**
     * character attack
     */
    characterAttack() {
        if (this.world.keyboard.SPACE) {
            this.shoot();
        }
    }

    /**
     * camera focus character
     */
    cameraFocusCharacter() {
        if (this.x > 100 && !world.stopUserInput) {
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * 
     */
    cameraEnd() {
        if (this.x > 5140) {
            this.world.camera_x = this.world.level.cameraEnd_x;
        }
    }

    /**
     * character animations
     * 
     * @returns 
     */
    animedCharacter() {
        if (this.isDead()) {
            this.dyingAnimation();
            return;
        }
        if (this.isHurt()) {
            this.hurtAnimation();
            return;
        }
        if (this.isShooting()) {} else this.characterSwimming();
    }

    /**
     * character swimming animation
     */
    characterSwimming() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.IMAGES_SWIMMING);
            this.idleTime = new Date().getTime();
        } else
            this.characterDontMoveAnimation();
    }

    /**
     * character sleeping animation
     */
    characterDontMoveAnimation() {
        if (new Date().getTime() - this.idleTime > 10000) {
            this.playAnimation(this.IMAGES_SLEEPING);
        } else {
            this.playAnimation(this.IMAGES_STAYING);
        }
    }

    /**
     * This function gives the dying animation
     * 
     * @param {integer} i imagecount
     */
    dyingAnimation() {
        this.world.stopUserInput = true;
        if (this.enemyType == 'poison') {
            this.poisonDead();
        } else {
            this.electroDead();
        }
    }

    /**
     * poison dead animation
     */
    poisonDead() {
        if (this.deadAnimation < 12) {
            this.playAnimation(this.IMAGES_POISON_DEAD);
            this.deadAnimation++
        } else {
            this.loseScreen();
        }
    }

    /**
     * electro dead animation
     */
    electroDead() {
        if (this.deadAnimation < 10) {
            this.playAnimation(this.IMAGES_SHOCK_DEAD);
            this.deadAnimation++
        } else {
            this.loseScreen();
        }
    }

    /**
     * show gameOver screen
     */
    loseScreen() {
        BACKGROUND_MELODY.pause();
        LOSE_SOUND.play();
        stopGame();
        renderGameOver('lose');
    }

    /**
     * gives the correct hurt animation
     */
    hurtAnimation() {
        if (this.enemyType == 'poison') {
            this.playAnimation(this.IMAGES_POISON);
        } else {
            this.playAnimation(this.IMAGES_SHOCK);
        }
    }

    /**
     * initialize a shot if it is not already being fired
     * 
     * @returns ""
     */
    shoot() {
        if (this.isShooting()) {
            return;
        }
        this.shootImg = 0;
        this.lastShoot = new Date().getTime();
    }

    /**
     *  This function detects the time that has passed since the last shoot
     * 
     * @returns isShooting = true
     */
    isShooting() {
        let timepassed = new Date().getTime() - this.lastShoot;
        timepassed = timepassed / 1000;
        return timepassed < 0.85;
    }

    /**
     * animate bubble attack
     */
    bubbleAttack() {
        if (this.shootImg < 8) {
            BUBBLE_SOUND.play();
            if (this.world.collectedFlasks > 0 && Endboss.endbossSwimming) {
                this.poisonBubble();
            } else {
                this.normalBubble();
            }
            this.shootImg++;
        } else {
            this.world.checkBubbleAttack(this.bubbleType);
            this.useFlask();
            this.shootImg = 0;
        }
    }

    /**
     * shoot poison bubble
     */
    poisonBubble() {
        this.playAnimation(this.IMAGES_ATTACK_WHALE);
        this.bubbleType = 'poison';
    }

    /**
     * shoot normal bubble
     */
    normalBubble() {
        this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
        this.bubbleType = 'normal';
    }

    /**
     * use flask for poison bubble
     */
    useFlask() {
        if (this.bubbleType == 'poison') {
            this.world.changeFlask(-1);
        }
    }
}