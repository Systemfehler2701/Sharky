let intervalIds = [];

function addIntervalId(id) {
    intervalIds.push(id);
    console.log(id);
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}