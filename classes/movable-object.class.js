class MovableObject {
    x = 100;
    y = 100;
    img;
    height = 80;
    width = 80;
    speed = 0.15;
    imageCache = [];
    currentImage = 0;
    amplitude = 1; // Amplitude der Sinuswelle
    frequency = 1; // Frequenz der Sinuswelle (in Hz)
    time = 0;
    otherDirection = false;
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 7 % 6; => 1, Rest 1
        // i= 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
            this.x -= this.speed;
        }, 1000 / 60);
    }
    moveDown() {
        setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60);
    }

    moveSinus() {
        setInterval(() => {
            this.y += this.amplitude * Math.sin(2 * Math.PI * this.frequency * this.time);
            this.x -= this.speed;
            this.time += 0.01;
        }, 1000 / 60);
    }
}