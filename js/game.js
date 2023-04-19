let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let audioMuted = false;
background_audio = new Audio('audio/background_audio.mp3');

async function init() {
    await initLevel();
    await startGame();
    await hideStartScreen();
    playBgAudio();
    mobileKeyboardEvents();
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
    hide('start-btn');
    hide('start-screen');
    show('canvas');
    hide('legal');
    hide('mobile-legal');
}


function showEndScreen() {
    show('end-screen');
    hide('canvas');
    show('restart-btn');
    background_audio.pause();
}


function reStartGame() {
    hide('end-screen');
    show('canvas');
    hide('restart-btn');
    playBgAudio();
    initLevel();
    startGame();
}


// FULLSCREEN
function fullscreen() {
    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    let docElm = document.documentElement;
    if (!isInFullScreen) {
        enterFullscreen(docElm);
        openFullscreenSettings();
    } else {
        exitFullscreen();
        closeFullscreenSettings();
    }
}


function openFullscreenSettings() {
    add('canvas', 'fullscreen-height', 'fullscreen-width');
    add('start-screen', 'fullscreen-height', 'fullscreen-width');
    add('end-screen', 'fullscreen-height', 'fullscreen-width');
    add('keyboard-control-container', 'fullscreen-width');
}


function closeFullscreenSettings() {
    remove('canvas', 'fullscreen-height', 'fullscreen-width');
    remove('start-screen', 'fullscreen-height', 'fullscreen-width');
    remove('end-screen', 'fullscreen-height', 'fullscreen-width');
    remove('keyboard-control-container', 'fullscreen-width');
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


function toggleAudio(device) {
    let audio = document.getElementById(`audio-${device}`);
    if (audio.classList.contains('audio-icon-on')) {
        audioMuted = true;
        audio.classList.remove('audio-icon-on');
        audio.classList.add('audio-icon-off');
        background_audio.pause();
    } else if (audio.classList.contains('audio-icon-off')) {
        audioMuted = false;
        audio.classList.remove('audio-icon-off');
        audio.classList.add('audio-icon-on');
        background_audio.play();
    }
}


function playBgAudio() {
    let comp = document.getElementById('audio-comp');
    let mobile = document.getElementById('audio-mobile');
    if (comp.classList.contains('audio-icon-on') && audioMuted == false || mobile.classList.contains('audio-icon-on' && audioMuted == false)) {
        background_audio.volume = 0.2;
        background_audio.loop = true;
        background_audio.play();
    } else {
        background_audio.pause();
    }
}


//HILFSFUNKTION SHOW/HIDE
function show(elm) {
    document.getElementById(`${elm}`).classList.remove('d-none');
}

function hide(elm) {
    document.getElementById(`${elm}`).classList.add('d-none');
}

function remove(elm, ...classes) {
    let classList = document.getElementById(`${elm}`).classList;
    classes.forEach(className => classList.remove(className));
}

function add(elm, ...classes) {
    let classList = document.getElementById(`${elm}`).classList;
    classes.forEach(className => classList.add(className));
}


//Keyevents
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

    if (event.code == 'Escape') {
        closeFullscreenSettings();
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


//Mobile keyevents
function mobileKeyboardEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    })

    document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    })
}


