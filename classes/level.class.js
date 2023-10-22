class Level {
    enemies;
    backgroundObjects;
    light;
    items;
    level_end_x = 1440 * 4 - 220;
    cameraEnd_x = -5040;
    constructor(enemies, backgroundObjects, light, items) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.light = light;
        this.items = items;

    }

}