/* Define Elements */

let startDiv = document.getElementById('startDiv');
let stage = document.getElementById('stage');
let ball = document.getElementById('ball');
let sprite1 = document.getElementById('sprite1');
let sprite2 = document.getElementById('sprite2');
let move;
let move2;
let spriteSpeed = 3;
let ballSpeed = 2;
let player1 = 0;
let player2 = 0;
let defaultTime = 180;
let time = defaultTime;
let keys = {
    up: false,
    down: false,
    w: false,
    s: false
};
let ballInt;

function startGame() {
    startDiv.style.display = "none";

    window.onkeydown = (key) => {
        startMove(key);
    }
    window.onkeyup = (key) => {
        stopMove(key);
    }

    player1 = 0;
    player2 = 0;

    document.getElementById('player1').innerHTML = "0";
    document.getElementById('player2').innerHTML = "0";

    moveBall();
    startTimer();

}
function startMove(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        keys.up = true;
    }
    else if (e.keyCode == '40') {
        // down arrow
        keys.down = true;
    }
    else if (e.keyCode == '87') {
        // w key
        keys.w = true;
    }
    else if (e.keyCode == '83') {
        // s key
        keys.s = true;
    }

    moveSprite();
}
function stopMove(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        keys.up = false;
        stopSprite('sprite1');
    }
    else if (e.keyCode == '40') {
        // down arrow
        keys.down = false;
        stopSprite('sprite1');
    }
    else if (e.keyCode == '87') {
        // w key
        keys.w = false;
        stopSprite('sprite2');
    }
    else if (e.keyCode == '83') {
        // s key
        keys.s = false;
        stopSprite('sprite2');
    }

}
function stopSprite(sprite) {

    if (sprite === "sprite1") {
        clearInterval(move);
        move = undefined;
    }
    if (sprite === "sprite2") {
        clearInterval(move2);
        move2 = undefined;
    }
}
function moveSprite(id, direction) {

    if (keys.up == true && move == undefined) {

        move = setInterval(() => {

            let startpos = sprite1.offsetTop;

            if (startpos) {

                sprite1.style.top = (startpos - spriteSpeed) + "px";
            }
        }, 1)
    }
    if (keys.down == true && move == undefined) {

        move = setInterval(() => {
            let startpos = sprite1.offsetTop;

            if (startpos < (stage.offsetHeight - sprite1.offsetHeight)) {
                sprite1.style.top = (startpos + spriteSpeed) + "px";
            }
        }, 1)
    }
    if (keys.w == true && move2 == undefined) {

        move2 = setInterval(() => {
            let startpos = sprite2.offsetTop;
            if (startpos) {
                sprite2.style.top = (startpos - spriteSpeed) + "px";
            }
        }, 1)
    }
    if (keys.s == true && move2 == undefined) {

        move2 = setInterval(() => {
            let startpos = sprite2.offsetTop;
            if (startpos < (stage.offsetHeight - sprite1.offsetHeight)) {
                sprite2.style.top = (startpos + spriteSpeed) + "px";
            }
        }, 1)
    }

}
function moveBall() {

    let directionY = ballSpeed;
    let directionX = ballSpeed;

    ballInt = setInterval(() => {

        let startx = ball.offsetLeft;
        let starty = ball.offsetTop;


        if (starty < 15) {
            directionY = ballSpeed;
        }
        if (starty > (stage.offsetHeight - 15)) {
            directionY = -ballSpeed;
        }
        if (startx < 5) {
            directionX = ballSpeed;
            scorePoint('right');
        }
        if (startx > (stage.offsetWidth - 5)) {
            directionX = -ballSpeed;
            scorePoint('left');
        }
        if (checkOverlap()) {

            if (directionX < 0) {
                directionX = ballSpeed;
            } else {
                directionX = -ballSpeed;
            }
        }



        ball.style.left = (startx + directionX) + "px";
        ball.style.top = (starty + directionY) + "px";
    }, 1);

}
function checkOverlap() {

    let ballPos = ball.getBoundingClientRect();
    let sprite1Pos = sprite1.getBoundingClientRect();
    let sprite2Pos = sprite2.getBoundingClientRect();

    if (ballPos['bottom'] >= sprite1Pos['top'] && ballPos['bottom'] <= sprite1Pos['bottom'] && ballPos['right'] >= sprite1Pos['left'] && ballPos['right'] <= sprite1Pos['right']) {
        return true;
    }
    if (ballPos['top'] <= sprite1Pos['top'] && ballPos['top'] >= sprite1Pos['bottom'] && ballPos['right'] >= sprite1Pos['left'] && ballPos['right'] <= sprite1Pos['right']) {
        return true;
    }
    if (ballPos['bottom'] >= sprite2Pos['top'] && ballPos['bottom'] <= sprite2Pos['bottom'] && ballPos['left'] >= sprite2Pos['left'] && ballPos['left'] <= sprite2Pos['right']) {
        return true;
    }
    if (ballPos['top'] <= sprite2Pos['top'] && ballPos['top'] >= sprite2Pos['bottom'] && ballPos['left'] >= sprite2Pos['left'] && ballPos['left'] <= sprite2Pos['right']) {
        return true;
    }


}

function scorePoint(player) {
    if (player == "left") {
        player2 += 1;
        document.getElementById('player2').innerHTML = player2;

        let scoreFlash = document.getElementById('scoreFlashplayer2');

        scoreFlash.style.display = "block";

        setTimeout(() => {
            scoreFlash.style.display = "none";;
        }, 100)
    }
    if (player == "right") {
        player1 += 1;
        document.getElementById('player1').innerHTML = player1;

        let scoreFlash = document.getElementById('scoreFlashplayer1');

        scoreFlash.style.display = "block";

        setTimeout(() => {
            scoreFlash.style.display = "none";;
        }, 100)
    }
}
function startTimer() {
    let display = document.getElementById('timer');

    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    display.innerHTML = minutes + ":" + seconds;

    let timer = setInterval(() => {

        time -= 1;

        minutes = Math.floor(time / 60);
        seconds = time - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        display.innerHTML = minutes + ":" + seconds;

        if (time == 0) {
            endGame();
            clearInterval(timer);
        }
    }, 1000);


}
function endGame() {

    ball.style.top = "50%";
    ball.style.left = "50%";

    clearInterval(ballInt);
    startDiv.style.display = "block";

    time = defaultTime;

    let Winner;

    if (player1 > player2) {
        Winner = "Red  PlayerWins!";
    } else if (player1 < player2) {
        Winner = "Blue Player Wins!";
    } else if (player1 == player2) {
        Winner = "It's a draw!"
    }

    startDiv.getElementsByTagName('h2')[0].innerHTML = Winner;
    startDiv.getElementsByTagName('button')[0].innerHTML = "Play Again?";
}
