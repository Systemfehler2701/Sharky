class BackgroundObject extends MovableObject {
    x_offset;
    width = 720;
    height = 480;
    constructor(imagePath, x, speed) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x_offset = x;
        this.x = this.x_offset;
        if (speed != undefined) {
            this.speed = speed;
            this.animate();
        }
    }

    animate() {
        setInterval(() => {
            if (world != undefined) {
                this.x = -world.camera_x * this.speed + this.x_offset;
            }

        }, 1000 / 60);
    }
}