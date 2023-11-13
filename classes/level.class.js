class Level {
    enemies;
    backgroundObjects;
    light;
    items;
    level_end_x = 1440 * 4 - 220;
    cameraEnd_x = -5040;

    /**
     * Creates a level instance with the given object groups
     * @param {Array} enemies - The group of enemies in the level
     * @param {Array} backgroundObjects - The group of background objects in the level
     * @param {Array} light - The group of lights in the level
     * @param {Array} items - The group of items in the level
     */
    constructor(enemies, backgroundObjects, light, items) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.light = light;
        this.items = items;
    }
}