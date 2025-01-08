let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let fullscreenButton = document.getElementById('fullscreenButton');

function init() {
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controlsDiv').style.display = 'none';
    document.getElementById('gameSound').style.marginBottom = '420px';

}

function toggleControls() {
    const controlsDiv = document.getElementById('controlsDiv');
    if (controlsDiv.style.display === 'none') {
        controlsDiv.style.display = 'flex';
    } else {
        controlsDiv.style.display = 'none';
    }
}

let isMuted = false;

function toggleMute() {
    const muteButton = document.getElementById('gameSound');
    isMuted = !isMuted; // Zustand umschalten

    // Zustand im localStorage speichern
    localStorage.setItem('isMuted', isMuted);

    // Alle HTML-Audio-Elemente stummschalten/aktivieren
    document.querySelectorAll('audio, video').forEach(media => {
        media.muted = isMuted;
    });

    if (window.allAudioObjects) {
        window.allAudioObjects.forEach(audioObj => {
            if (isMuted) {
                audioObj.pause();
            } else {
                audioObj.play();
            }
        });
    }

    // Button-Bild ändern
    muteButton.src = isMuted
        ? "img_pollo_locco/soundOff.png"
        : "img_pollo_locco/soundOn.png";

    console.log(isMuted ? "Sound ist stummgeschaltet" : "Sound ist aktiviert");
}

function restoreMuteState() {
    const savedMuteState = localStorage.getItem('isMuted'); // Zustand aus localStorage lesen
    if (savedMuteState !== null) {
        isMuted = JSON.parse(savedMuteState); 
    }
    const muteButton = document.getElementById('gameSound');
    muteButton.src = isMuted
        ? "img_pollo_locco/soundOff.png"
        : "img_pollo_locco/soundOn.png";
    document.querySelectorAll('audio, video').forEach(media => {
        media.muted = isMuted;
    });
    if (window.allAudioObjects) {
        window.allAudioObjects.forEach(audioObj => {
            if (isMuted) {
                audioObj.pause();
            }
        });
    }
}

window.addEventListener('load', restoreMuteState);

let gameStop = false;

document.addEventListener("keydown", (e) => {
    if (gameStop) return; // Beende die Verarbeitung, wenn das Spiel gestoppt ist

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.THROW = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.JUMP = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (gameStop) return; // Beende die Verarbeitung, wenn das Spiel gestoppt ist

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.THROW = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.JUMP = false;
    }
});
