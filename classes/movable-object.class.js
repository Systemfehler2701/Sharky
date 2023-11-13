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

    /**
     * Handles the character being hit by an enemy.
     * @param {string} enemyType - The type of enemy hitting the character.
     */
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

    /**
     * Checks if the character is in the Invincible phase
     * @returns {boolean} - Returns true if the character is in the Invincible phase
     */
    isInvincible() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;
    }

    /**
     * Checks if the character is dead
     * @returns {boolean} - Returns true if the character is dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the character collides with another object
     * @param {Object} obj - The object to check for collisions against
     * @returns {boolean} - Returns true if collision
     */
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

    /**
     * Checks if the character is in the aggro area of ​​the object and activates the aggro
     * @param {Object} obj - The object whose aggro range is being checked
     */
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

    /**
     * Checks if a point is within the character's hitbox
     * @param {Object} pointToCheck - The point to check
     * @returns {boolean} - Returns true if the point is in the hitbox
     */
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

    /**
     * Plays an animation by swapping images
     * @param {Array} images - The images of the animation
     */
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

    /**
     * Moves the character to the left
     * @returns {number} - Returns the ID of the interval to be able to stop it later
     */
    moveLeft() {
        return addIntervalId(setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60));
    }

    /**
     * Moves the character to the right
     * @returns {number} - Returns the ID of the interval to be able to stop it later
     */
    moveRight() {
        addIntervalId(setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60));
    }

    /**
     * Moves the character up
     * @returns {number} - Returns the ID of the interval to be able to stop it later
     */
    moveUp() {
        addIntervalId(setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60));
    }

    /**
     * Moves the character down
     * @returns {number} - Returns the ID of the interval to be able to stop it later
     */
    moveDown() {
        addIntervalId(setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60));
    }

    /**
     * Moves the character sinusoidally
     * @returns {number} - Returns the ID of the interval to be able to stop it later
     */
    moveSinus() {
        return addIntervalId(setInterval(() => {
            this.y += this.amplitude * Math.sin(2 * Math.PI * this.frequency * this.time);
            this.x -= this.speed;
            this.time += 0.01;
        }, 1000 / 60));
    }
}