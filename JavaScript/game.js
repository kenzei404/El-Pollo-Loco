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
    document.getElementById('fullscreenButton').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controlsDiv').style.display = 'none'; // Versteckt Controls beim Start
}

function toggleControls() {
    const controlsDiv = document.getElementById('controlsDiv');
    if (controlsDiv.style.display === 'none') {
        controlsDiv.style.display = 'flex'; // Controls anzeigen
    } else {
        controlsDiv.style.display = 'none'; // Controls ausblenden
    }
}


document.addEventListener("keydown", (e) => {

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    };
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    };
    if (e.keyCode == 38) {
        keyboard.THROW = true;
    };
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    };
    if (e.keyCode == 32) {
        keyboard.JUMP = true;
    };    
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    };
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    };
    if (e.keyCode == 38) {
        keyboard.THROW = false;
    };
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    };
    if (e.keyCode == 32) {
        keyboard.JUMP = false;
    };
});