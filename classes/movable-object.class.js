class MovableObject {
    x = 50;
    y = 150;
    img;
    height;
    width;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}