let canvas;
let character = new character();
let ctx; 

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log('My Character is', character);
}