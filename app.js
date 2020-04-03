// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//Ui Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event Listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    //Check if its the winning Number
    if (guess === winningNum) {
        // Game over
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // wrong number
        guessesLeft = guessesLeft - 1;
        // Check to see if any guesses left
        if (guessesLeft === 0) {
            // Game over - Lost
            gameOver(false, `Game Over, the winning number was ${winningNum}`)

        } else {
            //Game Continues
            // Change border color
            guessInput.style.borderColor = "red";
            //Clear input
            guessInput.value = '';
            // Tells how many guesses left
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disables the input error
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Text Color
    message.style.color = color;
    // Set Message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get Winning Num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
