class Bubble extends MovableObject {
    speedY = 0;
    speedX = 30;
    acceleration = 0.1;
    offset = { x: 0, y: 0, width: 0, height: 0 };

    constructor(x, y, direction) {
        super();
        this.otherDirection = direction;
        this.x = x;
        this.y = y;
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.height = 60;
        this.width = 60;
        this.throw();
    }


    throw () {
        this.speedY = 0;
        this.riseUp();
        addIntervalId(setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
        }, 50));
    }


    riseUp() {
        addIntervalId(setInterval(() => {
            this.y += this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25));
    }

}