let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

async function init() {
    await initLevel();
    await startGame();
    await hideStartScreen();
}


async function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is', world);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}


async function hideStartScreen() {
    document.getElementById('start-btn').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}


function showEndScreen() {
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('restart-btn').classList.remove('d-none');
}


function reStartGame() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    initLevel();
    startGame();
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

// FULLSCREEN
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

// brauch ich die wirklich?
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleAudio() {
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