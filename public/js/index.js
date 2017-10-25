// HTML Elements
const form = document.forms[0];
const numTries = document.getElementById('tries');
const prevTriesSpan = document.getElementById('prev-tries');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const lettersDiv = document.getElementById('letters');
const alpha = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const answerArr = [{name: "joe"},{name: "bill"}, {name: "mike"}];
const progressDiv= document.getElementById('progress')
const answerPanel = document.getElementById('answer-panel')
const audio = document.querySelector('audio')
// possibly add a sound for a correct guess abd missed guess
const correctSound = './sounds/correct-answer.mp3'
const wrongSound = './sounds/wrong-answer.mp3'

/* notes Oct 24th -  create repo and commit to Github progress
*/


// Game Data
let triesCounter, answer, prevTries, timeoutId;

// Game Logic
function startGame() {
  triesCounter = 10;
  prevTries = [];
  answer = answerArr[Math.floor((Math.random() * answerArr.length))].name;
  numTries.textContent = triesCounter;
  prevTriesSpan.textContent = '';
  resultDiv.textContent = 'Welcome to Philly Athlete Guesser'
  lettersDiv.textContent = alpha.join(' ').toUpperCase();
  answerPanel.innerHTML = '_ '.repeat(answer.length);
}

function clearResultDiv() {
  timeoutId = setTimeout(function(){
    resultDiv.textContent = '';
  }, 3000);
}

function renderPrevTries() {
  prevTriesSpan.textContent = prevTries.sort().join(', ');
}

function isValidGuess(guess) {
  return !!guess.match(/[A-z]/gi) && !prevTries.includes(guess);
}

// Event Listeners
form.addEventListener('submit', function(event) {
   event.preventDefault();

  const guess = form.guess.value.toLowerCase();

  clearTimeout(timeoutId);

  if (isValidGuess(guess)) {
    // increment tries counter
    triesCounter--;
    numTries.textContent = triesCounter;

    // add prev try to list
     prevTries.push(guess);
     renderPrevTries();
    if (triesCounter < 1) {
      resultDiv.textContent = 'You lost! the Phamous Philly Athlete was:' + answer;
      restartBtn.classList.remove('hidden');
    }
    if (answer.indexOf(guess) !== -1){
      progressDiv.textContent = 'You found a letter';
      audio.src = correctSound;
      audio.play()
    } else {
      audio.src = wrongSound;
      audio.play()
    }

    if (guess === answer) {
      resultDiv.textContent = 'You guessed it! The answer is ' + answer;
      restartBtn.classList.remove('hidden');
    } else if (guess > answer) {
      resultDiv.textContent = 'Lower!';
      clearResultDiv();
    } else {
      resultDiv.textContent = 'Higher!';
      clearResultDiv();
    }
  } else {
    resultDiv.textContent = 'Input must be a letter that hasn\'t been guessed before.'
  }

  form.guess.value = '';
});

restartBtn.addEventListener('click', startGame);

window.addEventListener('load', function() {
  // Game stuff happens here...
  startGame();
})
