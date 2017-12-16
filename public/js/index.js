// HTML Elements
const form = document.forms[0];
const numTries = document.getElementById('tries');
const wrongGuessesSpan = document.getElementById('wrong-guesses');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const answerPanel = document.getElementById('answer-panel')
const correctGuesses = document.getElementById('correct-guesses')
const audio = document.querySelector('audio')
const modal = document.getElementById('modal')
const img = document.getElementById('modal-img')
const modalMsg = document.getElementById('modal-msg')
const modalCloseBtn = document.querySelector('a.close');

// sound for a correct guess abd missed guess
const correctSound = './sounds/correct-answer.mp3'
const wrongSound = './sounds/wrong-answer.mp3'

// answerArr moved to answers.js linked on html

// Game Data
let triesCounter, answer, wrongGuesses ;

///Game Functions

function startGame() {
  wrongGuesses = [];
  randomArrNum = Math.floor((Math.random() * answerArr.length))
  answer = answerArr[randomArrNum].fullName;
  triesCounter = 12;
  hiddenAnswer = answer.split('').map(letter => letter === ' '? ' ': '_');
  numTries.textContent = triesCounter;
  wrongGuessesSpan.textContent = '';
  resultDiv.textContent = ''
  correctGuesses.innerHTML = '<li>' +  hiddenAnswer.join('</li><li>') +'</li>'
  clearHints()

}

function clearResultDiv() {
  setTimeout(function(){
    resultDiv.textContent = '';
  }, 2000);
}


function clearHints () {
  hintOne.textContent = ''
  hintTwo.textContent = ''
  hintThree.textContent = ''
  hintFour.textContent = ''
  hintFive.textContent = ''
  restartBtn.classList.add('hidden')
  form.solve.value = ''
}

function renderwrongGuesses() {
  wrongGuessesSpan.innerHTML = '<li>' + wrongGuesses.sort().join('</li><li>') +'</li>';
}

function isValidGuess(guess) {
  return !!guess.match(/[A-z]/gi) && !wrongGuesses.includes(guess) && guess.length === 1 && !hiddenAnswer.includes(guess);
}

function winGame() {
modalMsg.textContent = 'You won! The Phamous Philly Athlete is: ' + answer.toUpperCase();
restartBtn.classList.remove('hidden');
img.src = answerArr[randomArrNum].picPath
modal.classList.remove('hidden');

}
function loseGame() {
modalMsg.textContent = 'You lost! the Phamous Philly Athlete was: ' + answer.toUpperCase();
img.src = './img/lose.jpg'
modal.classList.remove('hidden');
restartBtn.classList.remove('hidden');
}

function hideRestartModal() {
  modal.classList.add('hidden');
  startGame();
}

function decrementTries() {
  triesCounter--;
  numTries.textContent = triesCounter;
}

function hintLogic() {
  if (triesCounter === 10) {
    hintOne.textContent = 'This person played: ' + answerArr[randomArrNum].sport
  }
  if (triesCounter === 8) {
    hintTwo.textContent = 'This person wore uniform number: ' + answerArr[randomArrNum].uniformNum
  }
  if (triesCounter === 6) {
    hintThree.textContent = 'This person played: ' + answerArr[randomArrNum].position
  }
  if (triesCounter === 4) {
    hintFour.textContent = 'This person is currently: ' + answerArr[randomArrNum].status
  }
  if (triesCounter === 2) {
    hintFive.textContent = 'This person\'s nickname is: ' + answerArr[randomArrNum].nickName
  }
  if (triesCounter < 1) {
    loseGame();
  }
}


// Event Listeners
// Modal Event Listeners
modalCloseBtn.addEventListener('click', hideRestartModal);

restartBtn.addEventListener('click', hideRestartModal);

// guess and solve submit buttons listeners
form.addEventListener('submit', function(event) {
  event.preventDefault();
  var solve = form.solve.value.toLowerCase().trim();
  const guess = form.guess.value.toLowerCase();

  //solve logic
  if (solve) {
    if (solve === answer){
        return winGame()
      } else {
        resultDiv.textContent = `${solve.toUpperCase()} is not the correct answer`;
        clearResultDiv();
        decrementTries();
        hintLogic();
        }
      form.solve.value ='';
    }

  // guess logic
  if (guess) {

  if (isValidGuess(guess)) {
    decrementTries()
    // provide hints
    hintLogic()
    //check guess
    if (answer.indexOf(guess) !== -1){
      audio.src = correctSound;
      audio.play()
      for (i=0;i<answer.length;i++) {
        if (answer[i] === guess) {
          hiddenAnswer[i] =guess
        }
      }
      correctGuesses.innerHTML = '<li>' +  hiddenAnswer.join('</li><li>') +'</li>'
    } else {
      audio.src = wrongSound;
      audio.play()
      wrongGuesses.push(guess);
      renderwrongGuesses();
    }

    if (hiddenAnswer.join('') === answer) {
        winGame();
    }

  } else {
    resultDiv.textContent = 'Invalid Input or a letter that has already been guessed.';
    clearResultDiv();
  }

  form.guess.value = '';
  }
});



window.addEventListener('load', function() {
  startGame();
})
