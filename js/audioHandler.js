let allAudios = [];
let currentVolume = 1;
let BACKGROUND_MELODY = addAudio('audio/sharkiesmelody.wav');
let BUBBLE_SOUND = addAudio('audio/bubbles.wav');
let FLASK_SOUND = addAudio('audio/plopp.wav');
let COIN_SOUND = addAudio('audio/coin.wav');
let SHOCK_SOUND = addAudio('audio/electroshock.wav');
let LOSE_SOUND = addAudio('audio/lose.wav');
let WIN_SOUND = addAudio('audio/win.wav');
let POISON_SOUND = addAudio('audio/poison.wav');

/**
 * This function pull all audiofiles in the array all audios
 * 
 * @param {string} audiofile 
 * @returns  
 */
function addAudio(audiofile) {
    let newAudio = new Audio(audiofile);
    allAudios.push(newAudio);
    return newAudio;
}

/**
 * This function change the volume off all audiofiles
 * @param {number} volume 
 */
function setAllVolumes(volume) {
    allAudios.forEach(audio => {
        audio.volume = volume;
    });
}

/***
 * This function change the volume
 */
function toggleVolume() {
    playSound();
    let audiobutton = document.getElementById("audio-button");
    if (currentVolume === 1) {
        currentVolume = 0.3;
        if (audiobutton != undefined) {
            audiobutton.style.backgroundImage = "url('img/6.Botones/Start/toggle_sound_2.png')";
        }
    } else if (currentVolume === 0.3) {
        currentVolume = 0;
        if (audiobutton != undefined) {
            audiobutton.style.backgroundImage = "url('img/6.Botones/Start/toggle_sound_0.png')";
        }
    } else {
        currentVolume = 1;
        if (audiobutton != undefined) {
            audiobutton.style.backgroundImage = "url('img/6.Botones/Start/toggle_sound_3.png')";
        }
    }
    setAllVolumes(currentVolume);
}