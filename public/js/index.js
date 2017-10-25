// HTML Elements
const form = document.forms[0];
const numTries = document.getElementById('tries');
const wrongGuessesSpan = document.getElementById('wrong-guesses');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const lettersDiv = document.getElementById('letters');
const progressDiv= document.getElementById('progress')
const answerPanel = document.getElementById('answer-panel')
const audio = document.querySelector('audio')
// Hint HTML Elements - one by one for now





// const alpha = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const answerArr = [
  {firstName: "mike",
   lastName: 'schmidt',
   fullName: 'mike schmidt',
   sport: '⚾',
   uniformNum: 20,
   position: 'Third base',
   status: 'retired',
   nickName: 'Schmidtty'
 },
 {firstName: "allen",
  lastName: 'iverson',
  fullName: 'allen iverson',
  sport: '🏀',
  uniformNum: 3,
  position: 'Point Guard',
  status: 'retired',
  nickName: 'The Answer'
  }
]
// possibly add a sound for a correct guess abd missed guess
const correctSound = './sounds/correct-answer.mp3'
const wrongSound = './sounds/wrong-answer.mp3'
const loseSound = './sounds/sadtrombone.mp3'

/* notes Oct 25th
- logic to add correct guess to the answer - forEach loop to add guess and remove placeholder _
- style the answer and correct guesses
- logic to prevent correct guesses from going in the wrongGuesses array -COMPLETE
-  build out answerArr with hints - template COMPLETE
- figure out how hints will be displayed - basic format COMPLETE
- LOW Priority animation on the letters
*/


// Game Data
let triesCounter, answer, wrongGuesses, timeoutId, correctGuessesArray;

// Game Logic
function startGame() {

  wrongGuesses = [];
  randomArrnum = Math.floor((Math.random() * answerArr.length))
  answer = answerArr[randomArrnum].firstName;
  triesCounter = 10;
  // hiddenAnswer = ['_','_','_','_']

  hiddenAnswer = [].concat(answer.split('')).fill('_');
  // correctGuessesArray  = ['__ '.repeat(answerArr[randomArrnum].firstName.length) + '' + '__ '.repeat(answerArr[randomArrnum].lastName.length) ]
  numTries.textContent = triesCounter;
  wrongGuessesSpan.textContent = '';
  resultDiv.textContent = ''
  // lettersDiv.textContent = alpha.join(' ').toUpperCase();
  progressDiv.textContent = '';
  answerPanel.textContent = hiddenAnswer.join(' ')
  clearHints()

}


/* NOT using this functionality currentl but keeping code in case find a use*/
// function clearResultDiv() {
//   timeoutId = setTimeout(function(){
//     resultDiv.textContent = '';
//   }, 3000);
// }

function clearHints () {
  hintOne.textContent = ''
  hintTwo.textContent = ''
  hintThree.textContent = ''
  hintFour.textContent = ''
  hintFive.textContent = ''
}


function renderwrongGuesses() {
  wrongGuessesSpan.textContent = wrongGuesses.sort().join('  ');
}

function isValidGuess(guess) {
  return !!guess.match(/[A-z]/gi) && !wrongGuesses.includes(guess) && guess.length === 1;
}

// Event Listeners
form.addEventListener('submit', function(event) {
   event.preventDefault();

  const guess = form.guess.value.toLowerCase();

  // clearTimeout(timeoutId);

  if (isValidGuess(guess)) {
    // increment tries counter
    triesCounter--;
    numTries.textContent = triesCounter;

    // add prev try to list

    if (triesCounter === 8) {
      hintOne.textContent = 'This person played: ' + answerArr[randomArrnum].sport
    }
    if (triesCounter === 6) {
      hintTwo.textContent = 'This person wore uniform number: ' + answerArr[randomArrnum].uniformNum
    }
    if (triesCounter === 4) {
      hintThree.textContent = 'This person is currently: ' + answerArr[randomArrnum].status
    }
    if (triesCounter === 2) {
      hintFour.textContent = 'This person\'s nickname is: ' + answerArr[randomArrnum].nickName
    }
    if (triesCounter < 1) {
      resultDiv.textContent = 'You lost! the Phamous Philly Athlete was:' + answer.toUpperCase();
      restartBtn.classList.remove('hidden');
      audio.src = loseSound;
    }
    if (answer.indexOf(guess) !== -1){

      audio.src = correctSound;
      audio.play()
      /* research replace method - will need to replace the _ with guess letter
       seems splice will work better replace is a string method*/
      console.log(answer.indexOf(guess))
      console.log(guess)
      console.log(hiddenAnswer)
      hiddenAnswer.splice(answer.indexOf(guess),1,guess)
      console.log(hiddenAnswer)
      answerPanel.textContent = hiddenAnswer
    } else {
      audio.src = wrongSound;
      audio.play()
      wrongGuesses.push(guess);
      renderwrongGuesses();
    }

    if (guess === answer) {
      resultDiv.textContent = 'You guessed it! The answer is ' + answer;
      restartBtn.classList.remove('hidden');
    } else if (guess > answer) {
      // resultDiv.textContent = 'Lower!';

    } else {
      // resultDiv.textContent = 'Higher!';
      // clearResultDiv();
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
