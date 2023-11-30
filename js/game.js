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


/**
 * Starts the game by setting up the canvas and world.
 */
async function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is', world);
}


/**
 * Sets an interval that can be stopped.
 * @param {Function} fn - The function to be executed repeatedly.
 * @param {number} time - The time interval for function execution.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}


/**
 * Hides the start screen elements and displays the game canvas.
 */
async function hideStartScreen() {
    hide('start-btn');
    hide('start-screen');
    show('canvas');
    hide('legal');
    hide('mobile-legal');
}


/**
 * Displays the end screen elements and hides the game canvas.
 */
function showEndScreen() {
    show('end-screen');
    hide('canvas');
    show('restart-btn');
    background_audio.pause();
}


/**
 * Restarts the game by hiding the end screen, displaying the canvas, and initializing the game again.
 */
function reStartGame() {
    hide('end-screen');
    show('canvas');
    hide('restart-btn');
    playBgAudio();
    initLevel();
    startGame();
}


// FULLSCREEN

/**
 * Toggles fullscreen mode and related settings.
 */
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


/**
 * Adds fullscreen-related classes to specific elements for fullscreen mode.
 */
function openFullscreenSettings() {
    add('canvas', 'fullscreen-height', 'fullscreen-width');
    add('start-screen', 'fullscreen-height', 'fullscreen-width');
    add('end-screen', 'fullscreen-height', 'fullscreen-width');
    add('keyboard-control-container', 'fullscreen-width');
}


/**
 * Removes fullscreen-related classes from specific elements to exit fullscreen mode.
 */
function closeFullscreenSettings() {
    remove('canvas', 'fullscreen-height', 'fullscreen-width');
    remove('start-screen', 'fullscreen-height', 'fullscreen-width');
    remove('end-screen', 'fullscreen-height', 'fullscreen-width');
    remove('keyboard-control-container', 'fullscreen-width');
}


/**
 * Enters fullscreen mode for the given element.
 * @param {HTMLElement} docElm - The HTML element to be displayed in fullscreen mode.
 */
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


/**
 * Exits fullscreen mode.
 */
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


/**
 * Toggles the audio on or off based on the device.
 * @param {string} device - The device identifier.
 */
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


/**
 * Plays the background audio.
 */
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


// SHOW/HIDE FUNCTIONS

/**
 * Shows an HTML element by removing the 'd-none' class.
 * @param {string} elm - The ID of the HTML element to show.
 */
function show(elm) {
    document.getElementById(`${elm}`).classList.remove('d-none');
}


/**
 * Hides an HTML element by adding the 'd-none' class.
 * @param {string} elm - The ID of the HTML element to hide.
 */
function hide(elm) {
    document.getElementById(`${elm}`).classList.add('d-none');
}


/**
 * Removes specific classes from an HTML element.
 * @param {string} elm - The ID of the HTML element.
 * @param {...string} classes - The classes to be removed.
 */
function remove(elm, ...classes) {
    let classList = document.getElementById(`${elm}`).classList;
    classes.forEach(className => classList.remove(className));
}



/**
 * Adds specific classes to an HTML element.
 * @param {string} elm - The ID of the HTML element.
 * @param {...string} classes - The classes to be added.
 */
function add(elm, ...classes) {
    let classList = document.getElementById(`${elm}`).classList;
    classes.forEach(className => classList.add(className));
}


//KEYEVENTS

/**
 * Handles keydown events for keyboard controls.
 * @param {Event} event - The keydown event object.
 */
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



/**
 * Handles keyup events for keyboard controls.
 * @param {Event} event - The keyup event object.
 */
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


//MOBILE KEYEVENTS

/**
 * Sets up touch events for mobile keyboard controls.
 */
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


