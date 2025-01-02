class YouWin extends MovableObject {

    constructor() {
        super();  // Ensure the base class does not require parameters, or modify as necessary.
        gameStop = true;
        resetKeyboard();
        this.x = 0;   // Set x from the parameter.
        this.y = 0;   // Set y from the parameter.
        this.height = 480;
        this.width = 720;
        this.loadImage('img_pollo_locco/img/9_intro_outro_screens/win/win_2.png');
    }
}