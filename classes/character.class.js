class Character extends MovableObject {

    width = 250;
    height = 250;

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png', );
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length; //let i = 7 % 6; => 1, Rest 1
            // i= 0, 1, 2, 3, 4, 5, 0
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


}