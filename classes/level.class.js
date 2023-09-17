class Level {
    enemies;
    backgroundObjects;
    light;
    level_end_x = 1440 * 4 - 220;

    constructor(enemies, backgroundObjects, light) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.light = light;

    }

}