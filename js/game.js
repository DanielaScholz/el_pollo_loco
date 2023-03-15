let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('my character is', world);

}

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


window.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (event.code == 'ArrowUp') {
        keyboard.UP = true;
    }

    if (event.code == 'KeyD') {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.code == 'ArrowUp') {
        keyboard.UP = false;
    }

    if (event.code == 'KeyD') {
        keyboard.D = false;
    }
});

function fullscreen() {
    canvas.requestFullscreen();
}

function toggleAudio(){
    document.getElementById('audio').classList.toggle('audio-icon-off');
}

// function audioOn {
//     document.getElementById('audioOff').classList.remove('audio-icon-off');
//     document.getElementById('audioOff').classList.add('audio-icon-on');
// }

// function audioOff {
//     document.getElementById('audioOn').classList.remove('audio-icon-on');
//     document.getElementById('audioOn').classList.add('audio-icon-off');
// }