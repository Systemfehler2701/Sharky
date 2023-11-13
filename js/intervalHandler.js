let intervalIds = [];
let world;

/**
 * This function pull all intervals in the array intervalIdis
 * 
 * @param {*} id 
 * @returns id
 */
function addIntervalId(id) {
    intervalIds.push(id);
    return id;
}

/**
 * This function stops all intervals
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}