let canvas;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if (world.stopUserInput) {
        keyboard.LEFT = keyboard.RIGHT = keyboard.UP = keyboard.DOWN = keyboard.D = keyboard.SPACE = false;
        return;
    }
    if (event.code == "KeyA") {
        keyboard.LEFT = true;
    }
    if (event.code == "KeyD") {
        keyboard.RIGHT = true;
    }
    if (event.code == "KeyS") {
        keyboard.DOWN = true;
    }
    if (event.code == "KeyW") {
        keyboard.UP = true;
    }
    if (event.code == "Space") {
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code == "KeyA") {
        keyboard.LEFT = false;
    }
    if (event.code == "KeyD") {
        keyboard.RIGHT = false;
    }
    if (event.code == "KeyS") {
        keyboard.DOWN = false;
    }
    if (event.code == "KeyW") {
        keyboard.UP = false;
    }
    if (event.code == "Space") {
        keyboard.SPACE = false;
    }
});