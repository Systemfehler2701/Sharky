let canvas;
let keyboard = new Keyboard();

/**
 * This function initializes the game
 */
function init() {
    renderGameStartScreen();
}

/**
 * This function render the start screen
 */
function renderGameStartScreen() {
    let content = document.getElementById('game-content');
    content.innerHTML = /* html */ `
    <div class="start-screen">
        <div class="headline">
            <h1>Sharkie</h1>
        </div>
        <div class="game-info">
            <div class="game-info-buttons">
                <img src="img/6.Botones/Start/2.png" onclick="renderStory()">
                <img src="img/6.Botones/Start/sound.png" onclick="toggleVolume()">
            </div>
            <div class="instuctions" id="instructions">
                ${renderInstructions()}
            </div>
        </div>
    </div>`;
}

/**
 * This function render the instructions
 * 
 * @returns HTML
 */
function renderInstructions() {
    if (navigator.userAgentData.mobile == false) {
        return /* html */ `<div><img src="img/6.Botones/Key/wasd_keys.png"><span>Move Sharkie</span></div>
        <div><img src="img/6.Botones/Key/Space Bar key.png"><span>Attack</span></div>`;
    } else {
        return /* html */ `<div><img src="img/6.Botones/Key/arrow keys.png"><span>Move Sharkie</span></div>
        <div><div class="mobile-attack"><img class="mobile-attack" src="img/6.Botones/Key/ATTACK.png"></div><span>Attack</span></div>`;
    }
}

/**
 * This function render the story-screen
 */
function renderStory() {
    BUBBLE_SOUND.play();
    let content = document.getElementById('game-content');
    content.innerHTML = '';
    content.innerHTML = /* html */ `
    <div class="story-screen">
        <div class="story-text">
            <p>In den tiefen Gewässern des Mondscheinriffs lebte der kleine Hai Sharkie, ein ungewöhnlich mutiger und freundlicher Meeresbewohner.</p>
            <p>Eines Tages bedrohte der böse Orca namens Surfbrett den Frieden des Riffs. Mit seinen treuen Anhängern strebte Surfbrett danach, das Riff zu erobern und alle Bewohner zu unterwerfen. Sharkie erfuhr von der Gefahr und entschied sich, mutig
            gegen Surfbrett vorzugehen. Wird es Sharkie schaffen und den verrückt gewordene Orca und seine Anhänger mit seinem mächtigen Blubberblasenangriff aufzuhalten?</p>
        </div>
    <div class="story-button">
        <img src="img/6.Botones/Start/start_game.png" onclick="startGame()">
    </div>
</div>`;
}

/**
 * This function start the game 
 */
function startGame() {
    Endboss.endbossSwimming = false;
    Endboss.endbossDead = false;
    BUBBLE_SOUND.play();
    let content = document.getElementById('game-content');
    content.innerHTML = '';
    content.innerHTML = /* html */ `<div id="fullscreen" class="game-screen"><canvas id="canvas" width="720" height="480">          
    </canvas>
    ${renderStatusbar()}
    ${renderActionButtons()}</div>`;
    stopGame();
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * This function render the statusbar
 * 
 * @returns HTML
 */
function renderStatusbar() {
    return /* html */ `
    <div id="status" class="status ">
        <div class="energy-status"><img src="img/4. Marcadores/green/100_  copia 3.png"><span id="energy-counter">5</span></div>
        <div class="coin-status"><img src="img/4. Marcadores/green/100_ copia 6.png"><span id="coin-counter">0</span></div>
        <div class="flask-status"><img src="img/4. Marcadores/Posión/Animada/1.png"><span id="flask-counter">0</span></div>
        <div id="audio-button" onclick="toggleVolume()"></div>
    </div>`;
}

/**
 * This function render the action-buttons
 * 
 * @returns HTML
 */
function renderActionButtons() {
    if (navigator.userAgentData.mobile == true) {
        return /* html */ `
    <div class="game-buttons">
        <div class="move-buttons">
            <div class="move-button-up"><img class="touch-btn" id="KeyW" src="img/6.Botones/Key/UP.png"></div>
            <div class="move-button-left-right"><img class="touch-btn" id="KeyA" src="img/6.Botones/Key/LEFT.png"><img class="touch-btn" id="KeyD" src="img/6.Botones/Key/RIGHT.png"></div>
            <div class="move-button-down"><img class="touch-btn" id="KeyS" src="img/6.Botones/Key/DOWN.png"></div>
        </div>
        <div class="attack-button">
            <img class="touch-btn" id="Space" src="img/6.Botones/Key/ATTACK.png">
        </div>
    </div>`;
    } else {
        return /* html */ `
        <div class="fullscreen-button">
                <img class="touch-btn" id="Space" src="img/6.Botones/Key/fullscreen.png" onclick="fullscreen()">        
        </div>`;
    }
}

/**
 * This function play the backgroundmelody in loop
 */
function playSound() {
    BACKGROUND_MELODY.loop = true;
    BACKGROUND_MELODY.play();
}

/**
 * This function render the game-over screen
 * 
 * @param {string} winOrLose 
 */
function renderGameOver(winOrLose) {
    let content = document.getElementById('game-content');
    content.innerHTML = '';
    content.innerHTML = /* html */ `<div id="game-over" class="game-over-background-${winOrLose}">
        <div class="story-button">
        <img src="img/6.Botones/Start/play_again.png" onclick="startGame()">
    </div>
    </div>`;
}

/**
 * Event listener for character button control
 * Disables key controls when the world has stopped user input
 * @param {Event} event - The keyboard event
 */
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

/**
 * Event listener for character button control
 */
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

/**
 * Event listener for touch events
 * Checks whether the touched element contains a 'touch-btn' class and sends the corresponding keyboard event
 * @param {TouchEvent} event - The touch event
 */
window.addEventListener('touchstart', (event) => {
    if (event.target.classList.contains('touch-btn')) {
        let keyDown = new KeyboardEvent('keydown', {
            code: event.target.id
        });
        window.dispatchEvent(keyDown);
    }
});

/**
 * Event listener for touch events
 */
window.addEventListener('touchend', (event) => {
    if (event.target.classList.contains('touch-btn')) {
        let keyUp = new KeyboardEvent('keyup', {
            code: event.target.id
        });
        window.dispatchEvent(keyUp);
    }
});

/**
 * prevent touch hold opens the context menu while game-canvas is rendered
 */
document.addEventListener('contextmenu', function(event) {
    if (event.pointerType === 'touch' && document.getElementById('canvas') != null) {
        event.preventDefault();
    }
});

/**
 * open or close the fullscreen
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (fullscreen == document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen(fullscreen);
    }
}

/**
 * open fullscreen
 * 
 * @param {HTMLElement} element - this element will get the fullscreen
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * close fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}