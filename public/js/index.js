// HTML Elements
const form = document.forms[0];
const numTries = document.getElementById('tries');
const wrongGuessesSpan = document.getElementById('wrong-guesses');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const answerPanel = document.getElementById('answer-panel')
const correctGuesses = document.getElementById('correct-guesses')
const audio = document.querySelector('audio')
const video = document.querySelector('video')
const modal = document.getElementById('modal')
const img = document.getElementById('modal-img')
const modalMsg = document.getElementById('modal-msg')
const modalCloseBtn = document.querySelector('a.close');
// answer array of objexts - probably should move to a separate file
const answerArr = [
  {firstName: "mike",
   lastName: 'schmidt',
   fullName: 'mike schmidt',
   sport: '⚾',
   uniformNum: 20,
   position: 'Third base',
   status: 'Retired',
   nickName: 'Schmidtty',
   picPath:'./img/schmidt.jpg'
 },
 {firstName: "allen",
  lastName: 'iverson',
  fullName: 'allen iverson',
  sport: '🏀',
  uniformNum: 3,
  position: 'Point Guard',
  status: 'Retired',
  nickName: 'The Answer',
  picPath:'./img/iverson.jpg'
  },
  {firstName: "julius",
   lastName: 'erving',
   fullName: 'julius erving',
   sport: '🏀',
   uniformNum: 6,
   position: 'Forward',
   status: 'Retired',
   nickName: 'Doctor J',
   picPath:'./img/erving.jpg'
    },
   {firstName: "joel",
    lastName: 'embiid',
    fullName: 'joel embiid',
    sport: '🏀',
    uniformNum: 21,
    position: 'Center',
    status: 'Active',
    nickName: 'The Process',
    picPath:'./img/embiid.jpg'
    },
    {firstName: "jimmy",
     lastName: 'rollins',
     fullName: 'jimmy rollins',
     sport: '⚾',
     uniformNum: 11,
     position: 'Shortstop',
     status: 'Retired',
     nickName: 'JRoll',
     picPath:'./img/rollins.jpg'
    },
    {firstName: "reggie",
     lastName: 'white',
     fullName: 'reggie white',
     sport: '🏈',
     uniformNum: 92,
     position: 'Defensive End',
     status: 'Retired',
     nickName: 'The Minister',
     picPath: './img/white.jpg'
    },
    {firstName: "eric",
     lastName: 'lindros',
     fullName: 'eric lindros',
     sport: '🏒',
     uniformNum: 88,
     position: 'Defensive End',
     status: 'Retired',
     nickName: 'The Next One',
     picPath: './img/lindros.jpg'
    },

]
// possibly add a sound for a correct guess abd missed guess
const correctSound = './sounds/correct-answer.mp3'
const wrongSound = './sounds/wrong-answer.mp3'
// const loseSound = './sounds/sadtrombone.mp3'

/* notes Oct 27th
- clean up code
- stopping guesses on win/lose
- add more name to answerArr - class constructor for this array of object
- modal for loses
- tighten up hints logic
- size of wrong guess letters vs correct letters

DONE
- logic to add correct guess to the hidden answer - MOSTLY DONE - display without commaa
- logic for multiple instances of the same - element - look at Ruby code
- logic to compare the array of correct guess to the answer - ARRAY EQUALITY
- OPTIONAL: WIN & LOSE screen - got gifs need to add to modal or some other pop up
- logic to account for spaces - should just be a freebie -
  -style the answer and correct guesses
  - timeout on the invalid already guessed piece
  - figure out why space is removed when correct letter is guessed
  - solve button styling and function update
  - overall styling

*/


// Game Data
let triesCounter, answer, wrongGuesses ;


///Game Functions

function startGame() {
  wrongGuesses = [];
  randomArrNum = Math.floor((Math.random() * answerArr.length))
  answer = answerArr[randomArrNum].fullName;
  triesCounter = 10;
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
  video.classList.add('hidden')
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
modalMsg.textContent = 'You won! The answer Phamous Philly Athlete is: ' + answer.toUpperCase();
restartBtn.classList.remove('hidden');
img.src = answerArr[randomArrNum].picPath
modal.classList.remove('hidden');

}
function loseGame() {
modalMsg.textContent = 'You lost! the Phamous Philly Athlete was: ' + answer.toUpperCase();
img.src = ''
modal.classList.remove('hidden');
video.classList.remove('hidden');
video.play()
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
  if (triesCounter === 8) {
    hintOne.textContent = 'This person played: ' + answerArr[randomArrNum].sport
  }
  if (triesCounter === 6) {
    hintTwo.textContent = 'This person wore uniform number: ' + answerArr[randomArrNum].uniformNum
  }
  if (triesCounter === 4) {
    hintThree.textContent = 'This person is currently: ' + answerArr[randomArrNum].status
  }
  if (triesCounter === 2) {
    hintFour.textContent = 'This person\'s nickname is: ' + answerArr[randomArrNum].nickName
  }
  if (triesCounter < 1) {
    loseGame();
  }
}

function guessWrong() {


}

// Event Listeners
// modal Event Listeners
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
