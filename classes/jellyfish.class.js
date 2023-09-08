class JellyFish extends MovableObject {

    height = 90;
    width = 90;
    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');

        this.x = 200 + Math.random() * 500;
        this.y = 20 + Math.random() * 350;
    }
}