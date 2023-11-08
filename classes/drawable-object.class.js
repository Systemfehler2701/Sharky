class DrawableObject {
    x;
    y;
    img;
    height = 80;
    width = 80;
    imageCache = [];
    currentImage = 0;


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


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}