let intervalIds = [];
let world;

function addIntervalId(id) {
    intervalIds.push(id);
    return id;
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}