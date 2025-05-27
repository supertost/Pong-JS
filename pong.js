console.log("Hello World");

/*
function initCanvas() {
    $('#pong').attr("width",$(window).width());
    $('#pong').attr("height",$(window).height());
}

initCanvas();*/


const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
console.log(context);

const Width = 600;
const Height = 500;

const scale = window.devicePixelRatio;

canvas.width = Width * scale;
canvas.height = Height * scale;

canvas.style.width = Width + "px";
canvas.style.height = Height + "px";

context.scale(scale, scale);



//---------------------------------------------------------


// First Paddle
let paddleOneX = 15;
let paddleOneY = Height / 2 - 7.5;

// Second Paddle
let paddleTwoX = Width - 30;
let paddleTwoY = Height / 2 - 7.5;

context.fillStyle = "white";


let paddleW = 15;
let paddleH = 75;

let ballX;
let ballY;

//let ballX = Width / 2;
//let ballY = Height / 2;

let ballSpeedY;
let ballSpeedX;

resetBall();


let ballRadius = 7;


let playerOneScore = 0;
let playerTwoScore = 0;

let continueGame = true;
let notPaused = true;

let winner;

let computerSpeed = 30;


window.addEventListener("keydown", function(event) {
  if (event.key === "p" || event.key === "P") {
    notPaused = !notPaused;
  }
});

window.addEventListener("keydown", function(event) {
  if (event.key === "s" || event.key === "S") {
    continueGame = true;
    resetBall();
    playerOneScore = 0;
    playerTwoScore = 0;
    document.getElementById("player").textContent = playerOneScore;
    document.getElementById("computer").textContent = playerTwoScore;
  }
});

gameLoop();

function gameLoop() {


    if (continueGame && notPaused) {

        context.clearRect(0, 0, Width, Height);
        
        context.fillRect(paddleOneX, paddleOneY, paddleW, paddleH);
        
        context.fillRect(paddleTwoX, paddleTwoY, paddleW, paddleH);
        
        context.beginPath();
        context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        context.fill();
    
        checkBallCollision();
        ballMovement();
        computerMovement();
    
        if (playerOneScore == 10 || playerTwoScore == 10) {
    
            if (playerOneScore > playerTwoScore) {
    
                console.log("player one won");
                winner = 1;
                continueGame = false;
            }
    
            else {
    
                console.log("player two won");
                winner = 2;
                continueGame = false;
            }
        }

    }
    
    if (!continueGame) {

        context.font = "48px sans-serif";

        context.fillText("Game Over", 100, 100);

        if (winner == 1) {

            context.fillText("Player 1 Won", 100, 150);
        }
        else {
            
            context.fillText("Computer Won", 100, 150);
        }
    }

    requestAnimationFrame(gameLoop);
}

function checkBallCollision() {

    if ((ballX < paddleOneX + paddleW && ballX > paddleOneX) && ((ballY >= paddleOneY) && (ballY <= paddleOneY + paddleH))) {

        ballSpeedX = -ballSpeedX;

        let increaseAmount = Math.floor(Math.random() * (1 - 0.7)) + 0.7;
        let MultiplyAmount = Math.random();

        let increaseAmount2 = Math.floor(Math.random() * (1 - 0.7)) + 0.7;
        let MultiplyAmount2 = Math.random();

        ballSpeedX *= MultiplyAmount + increaseAmount;
        ballSpeedY *= MultiplyAmount2 + increaseAmount2;
    }
    
    if ((ballX < 0) && ((ballY < paddleOneY) || (ballY > paddleOneY + paddleH))) {

        // Update Player Score
        playerTwoScore++;
        document.getElementById("computer").textContent = playerTwoScore;

        // Reset Ball Location
        resetBall();
    }

    if ((ballX > paddleTwoX - paddleW && ballX > paddleTwoX) && ((ballY >= paddleTwoY) && (ballY <= paddleTwoY + paddleH))) {

        ballSpeedX = -ballSpeedX;

        let increaseAmount = Math.floor(Math.random() * (1 - 0.7)) + 0.7;
        let MultiplyAmount = Math.random();

        let increaseAmount2 = Math.floor(Math.random() * (1 - 0.7)) + 0.7;
        let MultiplyAmount2 = Math.random();

        ballSpeedX *= MultiplyAmount + increaseAmount;
        ballSpeedY *= MultiplyAmount2 + increaseAmount2;
    }

    if ((ballX > Width) && ((ballY < paddleTwoY) || (ballY > paddleTwoY + paddleH))) {

        // Update Player Score
        playerOneScore++;
        document.getElementById("player").textContent = playerOneScore;

        // Reset Ball Location
        resetBall();
    }

    if (ballY > Height || ballY < 0) {

        ballSpeedY = -ballSpeedY;
    }
}

function resetBall() {

    ballX = Width / 2;
    ballY = Height / 2;

    ballSpeedY = -1;
    ballSpeedX = -1;
}

function ballMovement() {

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function computerMovement(ballSpeedY) {

    
    paddleTwoY += (ballY - (paddleTwoY + paddleH/2)) * 0.08;
    
    if (paddleTwoY < 0) paddleTwoY = 0;
    if (paddleTwoY + paddleH > Height) paddleTwoY = Height - paddleH;

    /*
    if (ballY > paddleTwoY + paddleH / 2) {

        paddleTwoY += Math.abs(ballSpeedY) + 0.2;
    }

    else {

        paddleTwoY -= Math.abs(ballSpeedY) - 0.2;
    }

    if (paddleTwoY + paddleH > Height) {
        paddleTwoY = Height - paddleH;
    }

    if (paddleTwoY < 0) {
        paddleTwoY = 0;
    }*/
}

document.addEventListener('mousemove', function(event) {
    //console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
    const rect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;

    paddleOneY = mouseY - paddleH / 2;

    if (paddleOneY + paddleH > Height) {
        paddleOneY = Height - paddleH;
    }

    if (paddleOneY < 0) {
        paddleOneY = 0;
    }
});
