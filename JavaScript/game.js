// Global variables for the game instance, canvas, and input handling
let canvas;
let world;
let ctx;
let keyboard = new Keyboard();
let fullscreenButton = document.getElementById('fullscreenButton');

/**
 * Initializes the game. Called when the game starts or reloads.
 */
function init() {
    if (window.world) {
        window.world = null; // Removes the old World instance to avoid memory leaks.
    }

    // Keybindings for restarting (R) or returning to the home screen (H)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'h') { 
            window.location.reload(); // Reloads the page (returns to the start screen).
        }
        if (event.key === 'r') {
            localStorage.setItem('isRestart', 'true'); // Saves the restart status in localStorage.
            window.location.reload(); // Restarts the game.
        }
    });

    // Starts Level 1 and initializes the game canvas
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Hides the start screen and displays the game canvas
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none'); 
    document.getElementById('touchButtons').classList.remove('d-none');
    document.getElementById('resetButtons').classList.remove('d-none');
    document.getElementById('howToPlayButton').classList.add('d-none');
    document.getElementById('recordStartScreen').classList.add('d-none');
    document.getElementById('impressum').classList.add('d-none');
    document.getElementById('controlsDiv').style.display = 'none';
    document.getElementById('gameSound').style.marginBottom = '420px';
}

/**
 * Simulates a key press, for example, to trigger actions via buttons.
 * @param {string} key - The key value to simulate.
 */
function simulateKeyPress(key) {
    const event = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(event);
}

// Loads the game configuration on first start or after a restart
window.onload = () => {
    const isRestart = localStorage.getItem('isRestart'); // Checks if a restart occurred.

    if (isRestart === 'true') {
        localStorage.removeItem('isRestart'); // Removes the restart status.
        init(); // Starts the game immediately.
    } else {
        // Displays the home menu
        document.getElementById('startScreen').classList.remove('d-none');
        document.getElementById('controls').classList.remove('d-none');
        document.getElementById('startButton').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('touchButtons').classList.add('d-none');
        document.getElementById('howToPlayButton').classList.remove('d-none');
        document.getElementById('recordStartScreen').classList.remove('d-none');
    }
};

/**
 * Toggles the visibility of the control instructions.
 */
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

/**
 * Displays the best record (high scores) on the start screen.
 */
function displayStartScreenRecord() {
    let record = localStorage.getItem('record');
    const recordContainer = document.getElementById('recordStartScreen');
    if (record) {
        record = JSON.parse(record);
        document.getElementById('recordCoins').textContent = `${record.coinPercentage}%`;
        document.getElementById('recordTime').textContent = record.elapsedTime;
        recordContainer.classList.remove('d-none');
    } else {
        recordContainer.classList.add('d-none');
    }
}

// Shows high scores when the start screen loads
document.addEventListener('DOMContentLoaded', displayStartScreenRecord);

/**
 * Opens the Impressum (legal notice) overlay.
 */
function openImpressum() {
    let impressumOverlay = document.getElementById('impressumOverlay');
    impressumOverlay.style.display = 'flex';
}

/**
 * Closes the Impressum (legal notice) overlay.
 */
function closeImpressum() {
    let impressumOverlay = document.getElementById('impressumOverlay');
    impressumOverlay.style.display = 'none';
}

/**
 * Displays the How-To-Play instructions.
 */
function howToPlay() {
    const overlay = document.getElementById('howToPlayOverlay');
    overlay.style.display = 'flex'; 
}

/**
 * Closes the How-To-Play instructions.
 */
function closeHowToPlay() {
    const overlay = document.getElementById('howToPlayOverlay');
    overlay.style.display = 'none';
}

// Sound settings
let isMuted = false;

/**
 * Toggles the game sound (mute/unmute).
 */
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

/**
 * Restores the previous mute state from localStorage.
 */
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

// Loads the mute settings on window load
window.addEventListener('load', restoreMuteState);

// Game controls (key down)
let gameStop = false;

document.addEventListener("keydown", (e) => {
    if (gameStop) return;

    // Controls for directional movement and throwing
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

// Game controls (key up)
document.addEventListener("keyup", (e) => {
    if (gameStop) return;

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) { // Throw key released
        keyboard.THROW = false;
        world.canThrow = true; // Allows throwing again
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.JUMP = false;
    }
});

/**
 * Activates an action (e.g., for touch controls).
 * @param {string} action - The action to trigger.
 */
function startAction(action) {
    keyboard[action] = true; 
}

/**
 * Deactivates an action (e.g., for touch controls).
 * @param {string} action - The action to stop.
 */
function stopAction(action) {
    keyboard[action] = false;
}

