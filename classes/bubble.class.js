class Bubble extends MovableObject {
    speedY = 0;
    speedX = 30;
    acceleration = 0.1;

    constructor() {
        super();
        this.x = 100;
        this.y = 100;
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.height = 60;
        this.width = 60;
        this.trow(100, 150);
    }


    trow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 1;
        this.riseUp();
        addIntervalId(setInterval(() => {
            this.x += 10;
        }, 50));
    }

    riseUp() {
        addIntervalId(setInterval(() => {
            this.y += this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25));
    }

}