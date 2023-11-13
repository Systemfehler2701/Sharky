class World {
    character = new Character();
    level = level1;
    stopUserInput = false;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bubbles = [];
    collectedCoins = 0;
    collectedFlasks = 0;


    /**
     * Creates an instance of the World class
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element on which the scene will be rendered
     * @param {Keyboard} keyboard - The keyboard control for the character
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Sets the reference to the world in the character object
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Starts the collision checking interval
     */
    run() {
        addIntervalId(setInterval(() => {
            this.checkCollisions();
        }, 200));
    }


    /**
     * Checks if the character performs a bubble attack and creates a new bubble
     * 
     * @param {string} bubbleType - The type of bubble
     */
    checkBubbleAttack(bubbleType) {
        let bubbleStartX = this.character.otherDirection ? -10 : 200;
        let bubble = new Bubble(this.character.x + bubbleStartX, this.character.y + 110, this.character.otherDirection, bubbleType);
        this.bubbles.push(bubble);
    }


    /**
     * executes collision detection for bubbles, items, enemys
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkCharacterCollision(enemy);
            this.character.isInAggroRange(enemy);
            this.checkBubbelsCollision(enemy);
        });
        this.level.items.forEach((item) => {
            if (this.character.isColliding(item) ||
                item.isColliding(this.character)) {
                this.collideWithItem(item);
            }
        });
    }


    /**
     * checks if the enemy collides with the character
     * 
     * @param {MovableObject} enemy item to check for collision
     */
    checkCharacterCollision(enemy) {
        if (!(this.character.isHurt() || this.character.isDead() || this.character.isInvincible() || enemy.isDead())) {
            if (this.character.isColliding(enemy) ||
                enemy.isColliding(this.character)) {
                this.collideWithEnemy(enemy);
            }
        }
    }


    /**
     * checks if the enemy collides with the bubble array
     * 
     * @param {MovableObject} enemy item to check for collision
     */
    checkBubbelsCollision(enemy) {
        this.bubbles.forEach((bubble) => {
            this.checkBubbelCollision(enemy, bubble);
            const indexOfBubble = this.bubbles.indexOf(bubble);
            if (indexOfBubble !== -1 && bubble.y < -100) {
                this.bubbles.splice(indexOfBubble, 1);
                clearInterval(bubble.bubbleIntervalId);
            }
        });
    }


    /**
     * checks if the enemy collides with a bubble
     * 
     * @param {MovableObject} enemy item to check for collision
     * @param {MovableObject} bubble item to check for collision
     */
    checkBubbelCollision(enemy, bubble) {
        if (bubble.isColliding(enemy) ||
            enemy.isColliding(bubble)) {
            enemy.hit(bubble.bubbleType);
            if (enemy instanceof Endboss) {
                this.statusBar.setPercentage(enemy.energy * 10);
            }
            const indexOfBubble = this.bubbles.indexOf(bubble);
            if (indexOfBubble !== -1) {
                this.bubbles.splice(indexOfBubble, 1);
                clearInterval(bubble.bubbleIntervalId);
            }
        }
    }


    /**
     * Reacts to collisions with enemies and updates the game state accordingly
     * 
     * @param {Enemy} enemy - The enemy object the character collided with
     */
    collideWithEnemy(enemy) {
        if (enemy instanceof PufferFish || enemy instanceof Endboss) {
            POISON_SOUND.play();
            this.character.hit('poison');
        } else if (enemy instanceof JellyFish) {
            SHOCK_SOUND.play();
            this.character.hit('electro');
        }
        let energyCounter = document.getElementById("energy-counter");
        energyCounter.innerHTML = this.character.energy;
    }


    /**
     * Reacts to collisions with objects and updates the game state accordingly
     * 
     * @param {Item} item - The item object that the character collided with
     */
    collideWithItem(item) {
        const indexOfItem = this.level.items.indexOf(item);
        if (indexOfItem !== -1) {
            this.level.items.splice(indexOfItem, 1);
            if (item instanceof Flask) {
                this.collectFlask();
            } else if (item instanceof Coin) {
                this.collectCoin();
            }
        }
    }


    /**
     * Collect a coin and update the coin counter
     */
    collectCoin() {
        let coinCounter = document.getElementById("coin-counter");
        COIN_SOUND.play();
        this.collectedCoins++;
        coinCounter.innerHTML = this.collectedCoins;
    }


    /**
     * Collect a flask and update the flask counter
     */
    collectFlask() {
        FLASK_SOUND.play();
        this.changeFlask(+1);
    }


    /**
     * Changes the number of bottles collected and updates the bottle counter
     * 
     * @param {number} amount - The number of bottles to add or remove
     */
    changeFlask(amount) {
        let flaskCounter = document.getElementById("flask-counter");
        this.collectedFlasks += amount;
        flaskCounter.innerHTML = this.collectedFlasks;
    }


    /**
     * Draws the game world on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackgroundToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.drawEndbossStatusBar();
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.bubbles);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
     * draw statusbar for endboss
     */
    drawEndbossStatusBar() {
        if (Endboss.endbossSwimming || Endboss.endbossDead) {
            this.ctx.translate(-this.camera_x, 0);
            //----- Space for fixed objects -----
            this.addToMap(this.statusBar);
            this.ctx.translate(this.camera_x, 0);
        }
    }


    /**
     * Adds background objects to the map
     * 
     * @param {array} objects - An array of objects that belong to the background
     */
    addBackgroundToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds objects to the map
     * 
     * @param {array} objects - An array of objects belonging to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds a moving object to the map and applies mirroring when required
     * 
     * @param {MovableObject} mo - The movable object that will be added to the map
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips an object horizontally
     * 
     * @param {MovableObject} mo - The movable object that will be flipped horizontally
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Resets a horizontally flipped object
     * 
     * @param {MovableObject} mo - The movable object that will be reset
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}