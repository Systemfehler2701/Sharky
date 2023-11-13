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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        addIntervalId(setInterval(() => {
            this.checkCollisions();
        }, 200));
    }


    checkBubbleAttack(bubbleType) {
        let bubbleStartX = this.character.otherDirection ? -10 : 200;
        let bubble = new Bubble(this.character.x + bubbleStartX, this.character.y + 110, this.character.otherDirection, bubbleType);
        this.bubbles.push(bubble);

    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!(this.character.isHurt() || this.character.isDead() || this.character.isInvincible() || enemy.isDead())) {
                if (this.character.isColliding(enemy) ||
                    enemy.isColliding(this.character)) {
                    this.collideWithEnemy(enemy);
                }
            }
            this.character.isInAggroRange(enemy);
            this.bubbles.forEach((bubble) => {
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
                const indexOfBubble = this.bubbles.indexOf(bubble);
                if (indexOfBubble !== -1 && bubble.y < -100) {
                    this.bubbles.splice(indexOfBubble, 1);
                    clearInterval(bubble.bubbleIntervalId);
                }
            });
        });
        this.level.items.forEach((item) => {
            if (this.character.isColliding(item) ||
                item.isColliding(this.character)) {
                this.collideWithItem(item);
            }
        });
    }

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

    collectCoin() {
        let coinCounter = document.getElementById("coin-counter");
        COIN_SOUND.play();
        this.collectedCoins++;
        coinCounter.innerHTML = this.collectedCoins;
    }


    collectFlask() {
        FLASK_SOUND.play();
        this.changeFlask(+1);
    }

    changeFlask(amount) {
        let flaskCounter = document.getElementById("flask-counter");
        this.collectedFlasks += amount;
        flaskCounter.innerHTML = this.collectedFlasks;
    }


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

    drawEndbossStatusBar() {
        if (Endboss.endbossSwimming || Endboss.endbossDead) {
            this.ctx.translate(-this.camera_x, 0);
            //----- Space for fixed objects -----
            this.addToMap(this.statusBar);
            this.ctx.translate(this.camera_x, 0);
        }

    }

    addBackgroundToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);

        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}