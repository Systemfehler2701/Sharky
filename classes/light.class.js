class Light extends MovableObject {
    y = 0;
    x_offset;
    width = 2880;
    height = 480;
    constructor(imagePath, x, speed) {
        super().loadImage(imagePath);
        this.x_offset = x;
        this.x = this.x_offset;
        this.speed = speed;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (world != undefined) {
                this.x = -world.camera_x * this.speed + this.x_offset;
            }

        }, 1000 / 60);
    }
}