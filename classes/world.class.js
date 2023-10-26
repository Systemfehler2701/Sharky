class World {
    character = new Character();
    level = level1;
    stopUserInput = false;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar;
    bubble = [new Bubble()];
    gameSound = new Audio('audio/ukulele.wav');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        //this.gameSound.play();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        addIntervalId(setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) ||
                    enemy.isColliding(this.character)) {
                    this.collideWithEnemy(enemy);
                }
            });
            this.level.items.forEach((item) => {
                if (this.character.isColliding(item) ||
                    item.isColliding(this.character)) {
                    this.collideWithItem(item);
                }
            });
        }, 200));
    }

    collideWithEnemy(enemy) {
        if (enemy instanceof PufferFish || enemy instanceof Endboss) {
            this.character.hit('poison');
            console.log('Collision with Character', enemy.name + ' Poison');
        } else if (enemy instanceof JellyFish) {
            this.character.hit('electro');
            console.log('Collision with Character', enemy.name + ' Electro');
        }

    }

    collideWithItem(item) {
        console.log('Collision with Character', item);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackgroundToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.bubble);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
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
        mo.drawFrame(this.ctx);

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