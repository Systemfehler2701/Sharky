class MovableObject {
    x;
    y;
    img;
    height = 80;
    width = 80;
    speed = 0.15;
    imageCache = [];
    currentImage = 0;
    amplitude = 2 + Math.random() * 1; // Amplitude der Sinuswelle
    frequency = 1 + Math.random() * 1; // Frequenz der Sinuswelle (in Hz)
    time = 0;
    otherDirection = false;
    offset;
    name;
    enemyType;
    energy = 100;
    lastHit = 0;
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.offset != undefined) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width + this.offset.width, this.height + this.offset.height);
            ctx.stroke();
        }
    }

    isColliding(obj) {
        if (this.isHurt() || this.isDead()) {
            return false;
        }
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
        //obj.onCollisionCourse;
    }

    hit(enemyType) {
        this.enemyType = enemyType;
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        addIntervalId(setInterval(() => {
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
        addIntervalId(setInterval(() => {
            this.y += this.amplitude * Math.sin(2 * Math.PI * this.frequency * this.time);
            this.x -= this.speed;
            this.time += 0.01;
        }, 1000 / 60));
    }
}