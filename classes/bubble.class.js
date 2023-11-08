class Bubble extends MovableObject {
    speedY = 0;
    speedX = 30;
    acceleration = 1;
    offset = { x: 0, y: 0, width: 0, height: 0 };
    bubbleStartX;
    distance = 200;
    bubbleIntervalId;
    bubbleType;

    constructor(x, y, direction, bubbleType) {
        super();
        this.otherDirection = direction;
        this.bubbleStartX = x;
        this.x = x;
        this.y = y;
        this.bubbleType = bubbleType;
        if (this.bubbleType == 'poison') {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');

        } else {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }
        this.height = 60;
        this.width = 60;
        this.blubb();
    }


    blubb() {
        this.speedY = 0;
        this.bubbleIntervalId = addIntervalId(setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
            this.riseUp();
        }, 50));
    }


    riseUp() {
        if (Math.abs(this.bubbleStartX - this.x) > this.distance) {
            this.y += this.speedY;
            this.speedY -= this.acceleration;
        }
    }

}