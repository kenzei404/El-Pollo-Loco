class GameOver extends MovableObject {
    constructor() {
        super();
        gameStop = true; // Spielsteuerung deaktivieren
        resetKeyboard(); // Alle Tasteneingaben stoppen
        this.x = 0;
        this.y = 0;
        this.height = 480;
        this.width = 720;
        this.loadImage('img_pollo_locco/img/9_intro_outro_screens/game_over/you lost.png');
        showEndscreen();
    }

    showEndscreen() {
        document.getElementById('gameOver').style.display = 'block';
    }
}
