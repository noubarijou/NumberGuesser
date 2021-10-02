//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI element
const   game = document.getElementById('game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

//assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', (e) => {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value)
//validate
    if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }    
//check if the result is right
    if(guess === winningNum) {
//game over won        
    gameOver(true, `${winningNum} is correct, You Win!`);       
    }else {
//wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0) {
        //game over lost
         gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    }else {
        //game continues - answer wrong
        //change border color
        guessInput.style.borderColor = 'red';
        //clear input
        guessInput.value = '';
        //tell user guess is wrong
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }        
} 
});

//game over function
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
//disable input
    guessInput.disabled = true; 
//changeborder and text if won
    guessInput.style.borderColor = color;
    message.style.color = color;
//Set message
    setMessage(msg);
//Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';    

}
//get winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)+min);
}


//set message function
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}