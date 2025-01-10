let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let fullscreenButton = document.getElementById('fullscreenButton');

function init() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'r') { 
            window.location.reload();
        }
    });
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none'); 
    document.getElementById('touchButtons').classList.remove('d-none');
    document.getElementById('controlsDiv').style.display = 'none';
    document.getElementById('gameSound').style.marginBottom = '420px';
}

function resetGame(){
    window.location.reload();
}

function toggleControls() {
    const controlsDiv = document.getElementById('controlsDiv');
    const currentDisplay = controlsDiv.style.display || window.getComputedStyle(controlsDiv).display;

    if (currentDisplay === 'none') {
        controlsDiv.style.display = 'flex';
        document.getElementById('controls').innerHTML = 'Hide Controls';
    } else {
        controlsDiv.style.display = 'none';
        document.getElementById('controls').innerHTML = 'Show Controls';
    }
}

function openImpressum() {
    let impressumOverlay = document.getElementById('impressumOverlay');
    impressumOverlay.style.display = 'flex'; // Overlay anzeigen
}

function closeImpressum() {
    let impressumOverlay = document.getElementById('impressumOverlay');
    impressumOverlay.style.display = 'none'; // Overlay ausblenden
}

function howToPlay() {
    const overlay = document.getElementById('howToPlayOverlay');
    overlay.style.display = 'flex'; // Overlay anzeigen
}

function closeHowToPlay() {
    const overlay = document.getElementById('howToPlayOverlay');
    overlay.style.display = 'none'; // Overlay ausblenden
}

let isMuted = false;

function toggleMute() {
    const muteButton = document.getElementById('gameSound');
    isMuted = !isMuted; 
    localStorage.setItem('isMuted', isMuted);
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
    muteButton.src = isMuted
        ? "img_pollo_locco/soundOff.png"
        : "img_pollo_locco/soundOn.png";
}

function restoreMuteState() {
    const savedMuteState = localStorage.getItem('isMuted'); 
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
    if (gameStop) return;

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
    if (gameStop) return;

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

function startAction(action) {
    keyboard[action] = true;
}

function stopAction(action) {
    keyboard[action] = false;
}