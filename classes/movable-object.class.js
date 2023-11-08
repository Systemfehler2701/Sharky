class MovableObject extends DrawableObject {
    speed = 0.15;
    amplitude = 2 + Math.random() * 1; // Amplitude der Sinuswelle
    frequency = 1 + Math.random() * 1; // Frequenz der Sinuswelle (in Hz)
    time = 0;
    otherDirection = false;
    offset;
    name;
    enemyType;
    energy = 1;
    lastHit = 0;
    oldAnimationPath = "";
    aggroRange = 250;
    isAggro = false;


    hit(enemyType) {
        this.enemyType = enemyType;
        if (this.enemyType == 'poison' && Endboss.endbossSwimming) {
            this.energy -= 1;
        }
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function detects the time that has passed since the last damage to an opponent
     * 
     * @returns isHurt = true
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }


    isInvincible() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;
    }


    isDead() {
        return this.energy == 0;
    }

    isColliding(obj) {
        let objectHitbox = {
            x: obj.x + obj.offset.x,
            y: obj.y + obj.offset.y,
            width: obj.width + obj.offset.width,
            height: obj.height + obj.offset.height
        };
        return this.isPointInHitbox({ x: objectHitbox.x, y: objectHitbox.y }) ||
            this.isPointInHitbox({ x: objectHitbox.x + objectHitbox.width, y: objectHitbox.y }) ||
            this.isPointInHitbox({ x: objectHitbox.x, y: objectHitbox.y + objectHitbox.height }) ||
            this.isPointInHitbox({ x: objectHitbox.x + objectHitbox.width, y: objectHitbox.y + objectHitbox.height });
    }

    isInAggroRange(obj) {
        let x = this.x + this.offset.x + this.width + this.offset.width;
        let xObj = obj.x + obj.offset.x;
        if (obj instanceof Endboss) {
            return;
        } else if (xObj - x < this.aggroRange && !obj.isAggro) {
            obj.isAggro = true;
            obj.speed = 2.5;
        }
    }


    isPointInHitbox(pointToCheck) {
        let hitbox = {
            x: this.x + this.offset.x,
            y: this.y + this.offset.y,
            width: this.width + this.offset.width,
            height: this.height + this.offset.height
        };
        return hitbox.x < pointToCheck.x &&
            (hitbox.x + hitbox.width) > pointToCheck.x &&
            hitbox.y < pointToCheck.y &&
            (hitbox.y + hitbox.height) > pointToCheck.y;
    }


    playAnimation(images) {
        if (this.oldAnimationPath == "" || this.oldAnimationPath != images[0]) {
            this.currentImage = 0;
            this.oldAnimationPath = images[0];
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        return addIntervalId(setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60));
    }
    moveRight() {
        addIntervalId(setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60));
    }
    moveUp() {
        addIntervalId(setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60));
    }
    moveDown() {
        addIntervalId(setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60));
    }

    moveSinus() {
        return addIntervalId(setInterval(() => {
            this.y += this.amplitude * Math.sin(2 * Math.PI * this.frequency * this.time);
            this.x -= this.speed;
            this.time += 0.01;
        }, 1000 / 60));
    }
}