let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
background_audio = new Audio('audio/background_audio.mp3');

async function init() {
    await initLevel();
    await startGame();
    await hideStartScreen();
    playBgAudio();
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
    background_audio.pause();
}


function reStartGame() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    playBgAudio();
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
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    let docElm = document.documentElement;
    if (!isInFullScreen) {
        enterFullscreen(docElm);
        document.getElementById('canvas').classList.add('fullscreen-height', 'fullscreen-width');
        document.getElementById('start-screen').classList.add('fullscreen-height', 'fullscreen-width');
        document.getElementById('end-screen').classList.add('fullscreen-height', 'fullscreen-width');
        document.getElementById('keyboard-control-container').classList.add('fullscreen-width')

    } else {
        document.getElementById('canvas').classList.remove('fullscreen-height', 'fullscreen-width');
        document.getElementById('start-screen').classList.remove('fullscreen-height', 'fullscreen-width');
        document.getElementById('end-screen').classList.remove('fullscreen-height', 'fullscreen-width');
        document.getElementById('keyboard-control-container').classList.remove('fullscreen-width');
        exitFullscreen();
    }

}

function enterFullscreen(docElm) {
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleAudio() {
    let audio = document.getElementById('audio');
    audio.classList.toggle('audio-icon-off');

    if (audio.classList.contains('audio-icon-off')) {
        background_audio.pause();
    } else if (audio.classList.contains('audio-icon-on')) {
        background_audio.play();
    } 
}

function playBgAudio() {
    background_audio.volume = 0.2;
    background_audio.loop = true;
    background_audio.play();
}

// function audioOn {
//     document.getElementById('audioOff').classList.remove('audio-icon-off');
//     document.getElementById('audioOff').classList.add('audio-icon-on');
// }

// function audioOff {
//     document.getElementById('audioOn').classList.remove('audio-icon-on');
//     document.getElementById('audioOn').classList.add('audio-icon-off');
// }