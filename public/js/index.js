// HTML Elements
const form = document.forms[0];
const numTries = document.getElementById('tries');
const wrongGuessesSpan = document.getElementById('wrong-guesses');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const lettersDiv = document.getElementById('letters');
const progressDiv= document.getElementById('progress')
const answerPanel = document.getElementById('answer-panel')
const correctGuesses = document.getElementById('correct-guesses')
const audio = document.querySelector('audio')
const video = document.querySelector('video'  )
// answer array of objexts - probably should move to a separate file
const answerArr = [
  {firstName: "mike",
   lastName: 'schmidt',
   fullName: 'mike schmidt',
   sport: '⚾',
   uniformNum: 20,
   position: 'Third base',
   status: 'Retired',
   nickName: 'Schmidtty'
 },
 {firstName: "allen",
  lastName: 'iverson',
  fullName: 'allen iverson',
  sport: '🏀',
  uniformNum: 3,
  position: 'Point Guard',
  status: 'Retired',
  nickName: 'The Answer'
  },
  {firstName: "julius",
   lastName: 'erving',
   fullName: 'julius erving',
   sport: '🏀',
   uniformNum: 6,
   position: 'Forward',
   status: 'Retired',
   nickName: 'Doctor J'
    },
   {firstName: "joel",
    lastName: 'embiid',
    fullName: 'joel embiid',
    sport: '🏀',
    uniformNum: 21,
    position: 'Center',
    status: 'Active',
    nickName: 'The Process'
    },
    {firstName: "jimmy",
     lastName: 'rollins',
     fullName: 'jimmy rollins',
     sport: '⚾',
     uniformNum: 11,
     position: 'Shortstop',
     status: 'Retired',
     nickName: 'JRoll'
    },
    {firstName: "reggie",
     lastName: 'white',
     fullName: 'reggie white',
     sport: '🏈',
     uniformNum: 92,
     position: 'Defensive End',
     status: 'Retired',
     nickName: 'The Minister'
    },
    {firstName: "eric",
     lastName: 'lindros',
     fullName: 'eric lindros',
     sport: '🏒',
     uniformNum: 88,
     position: 'Defensive End',
     status: 'Retired',
     nickName: 'The Next One'
    },

]
// possibly add a sound for a correct guess abd missed guess
const correctSound = './sounds/correct-answer.mp3'
const wrongSound = './sounds/wrong-answer.mp3'
const loseSound = './sounds/sadtrombone.mp3'

/* notes Oct 27th
- LOW Priority animation on the letters
- solve button
- stopping guesses on win/lose
- add more name to answerArr
- modal for the win lose gif
-overall styling
- timeout on the invalid already guessed piece
DONE
- logic to add correct guess to the hidden answer - MOSTLY DONE - display without commaa
- logic for multiple instances of the same - element - look at Ruby code
- logic to compare the array of correct guess to the answer - ARRAY EQUALITY
- OPTIONAL: WIN & LOSE screen - got gifs need to add to modal or some other pop up
- logic to account for spaces - should just be a freebie -
  -style the answer and correct guesses
  - figure out why space is removed when correct letter is guessed
*/


// Game Data
let triesCounter, answer, wrongGuesses, timeoutId, space;

// Game Logic
function startGame() {

  wrongGuesses = [];
  randomArrnum = Math.floor((Math.random() * answerArr.length))
  answer = answerArr[randomArrnum].fullName;
  triesCounter = 10;
  hiddenAnswer = [].concat(answer.split('')).fill('_');
  spacePosition= answer.indexOf(' ')
  space = ' '
  hiddenAnswer.splice(spacePosition,1,space)
  numTries.textContent = triesCounter;
  wrongGuessesSpan.textContent = '';
  resultDiv.textContent = ''
  // lettersDiv.textContent = alpha.join(' ').toUpperCase();
  progressDiv.textContent = '';
  correctGuesses.innerHTML = '<li>' +  hiddenAnswer.join('</li><li>') +'</li>'
  // var ul =document.getElementsByTagName('ul')[0]
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
  video.classList.add('hidden')
}


function renderwrongGuesses() {
  wrongGuessesSpan.innerHTML = '<li>' + wrongGuesses.sort().join('</li><li>') +'</li>';
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
      video.src = './sounds/lose.mp4'
      video.classList.remove('hidden');
      video.play()
      restartBtn.classList.remove('hidden');
      audio.src = loseSound;

    }

    if (answer.indexOf(guess) !== -1){

      audio.src = correctSound;
      audio.play()



      for (i=0;i<answer.length;i++) {
        if (answer[i] === guess) {
          hiddenAnswer.splice(i,1,guess);
        }
      }
      correctGuesses.innerHTML = '<li>' +  hiddenAnswer.join('</li><li>') +'</li>'
    } else {
      // increment tries counter only if miss
      triesCounter--;
      numTries.textContent = triesCounter;
      audio.src = wrongSound;
      audio.play()
      wrongGuesses.push(guess);
      renderwrongGuesses();
    }

    if (hiddenAnswer.join('') === answer) {
      resultDiv.textContent = 'You guessed it! The answer is ' + answer;
      restartBtn.classList.remove('hidden');
      video.src ='./sounds/win.mp4'
      video.classList.remove('hidden')
      video.play()
    }  else {
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
