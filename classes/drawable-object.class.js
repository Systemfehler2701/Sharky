class DrawableObject {
    x;
    y;
    img;
    height = 80;
    width = 80;
    imageCache = [];
    currentImage = 0;

    /**
     * set the object img to the path
     * 
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draws an image to the canvas context
     * 
     * @param {*} ctx canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * draw frame around objects with offset
     * 
     * @param {*} ctx canvas context
     */
    drawFrame(ctx) {
        if (this.offset != undefined) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width + this.offset.width, this.height + this.offset.height);
            ctx.stroke();
        }
    }

    /**
     * import an array of images to imageCache for accessing the image later
     * @param {array} arr contains the path to each image
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}