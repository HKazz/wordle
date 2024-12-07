let submitButton
let randomizedWord
let guesses = 6
const words = [
    "ABOUT",
    "BEGAN",
    "COURT",
    "DREAM",
    "EARLY",
    "FALSE",
    "GREAT",
    "HAPPY",
    "ICING",
    "JOINT",
    "LARGE",
    "MIGHT",
    "NEVER",
    "OCEAN",
    "PEACE",
    "QUICK",
    "RAINY",
    "THANK",
    "UNDER",
    "VIVID",
    "X-RAY",
    "YEARN",
    "ZEBRA",
    "ALONE",
    "BASIC",
    "CLEAR",
    "DANCE",
    "EMPTY",
    "FUNNY",
    "HAPPY",
    "IDEAL",
    "LOVER",
    "ARRAY",
    "PEACE",
    "QUICK",
    "WRATH",
    "QUERY",
    "TRUTH",
    "CRYPT",
    "SHORE",
    "WATER",
    "YOUNG"
  ];

let userInput = document.querySelector('#input')
submitButton = document.querySelector('.submit')
const boardEL = document.querySelectorAll('.sqr')
let guessEL = document.querySelector('.guess')
const resetButton = document.querySelector('.reset')


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
});


function openModal(modal){
    if(modal === null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal === null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}




function init(){
    console.log('initialization begun')
    boardEL.textContent = ''
    userInputValue = ''
    console.log('initialization complete')
    guesses = 7
    clearWord()
    updateGuess()
    cleanInput()
    randomWord()
}

function randomWord(){
    randomizedWord = words[Math.floor(Math.random() * words.length)]
    console.log(randomizedWord)
}

init()


console.log(userInput)
console.log(submitButton)
console.log(boardEL)

function updateBoard() {
    const userInputValue = userInput.value.toUpperCase(); // Ensure uppercase for comparison
  
    clearWord();
      const letters = userInputValue.split('');
      letters.forEach((letter, index) => {
        boardEL[index].textContent = letter
        return
      });
      boardEL.forEach((element, index) => {
        console.log(`${index}: ${element.textContent}`)
      })
    }
  
function clearWord(){
    boardEL.forEach(element => {
        element.textContent = ''
        element.style.backgroundColor = ''
    });
}

function cleanInput(){
    let input = document.getElementById('input')
    input.value = ""
    console.log(input)
    // input.textContent = ''
}

function checkWord(){
    const randomizedLetters = randomizedWord.split('')
    let isCorrect = true

    // boardEL.forEach((arg) => )
    boardEL.forEach((element, index) => {
        const letter = element.textContent
        if(letter === randomizedLetters[index]){
            console.log(`Letter ${index + 1}: ${element.textContent} is correct `)
            element.style.backgroundColor = 'green'
        }
        else if(randomizedLetters.includes(letter)){
            console.log(`Letter ${index + 1}: ${letter} is in the word but in the wrong position.`)
            element.style.backgroundColor = 'yellow'
            isCorrect = false
        }
        else{
            console.log(`Letter ${index + 1}: ${element.textContent} is incorrect`)
            element.style.backgroundColor = 'grey'
            isCorrect = false
        }
    });

    if(isCorrect){
        console.log('THE WORD IS RIGHT')
        alert('Congratulations! You guessed the word!')
        // add confetti
    }
    else{
        console.log('THE WORD IS WRONG')
    }
}

function updateGuess(){
    guessEL.textContent = `Guesses: ${guesses}`

    if(guesses <=  0){
        alert("game over.")
        guessEL.textContent = `Guesses: ${guesses}`
        return
    }
    else{
        guesses = guesses - 1
        guessEL.textContent = `Guesses: ${guesses}`
        return
    }

}


// function updateBoard(){
//     boardEL.textContent = userInput
// }

function submit(){
    let inputValue = userInput.value
    let myPattern = /^[A-Z]+$/i
    if (inputValue === '') {
        alert('Please enter a word.');
        return;
    }
    else if(inputValue.length < 5 || inputValue.length > 5){
        alert('Please enter a 5-letter word')

    }
    else if(myPattern.test(inputValue) === false){
        alert("Please enter letters only. No special characters or numbers")
    }
    else{
    //     inputValue = userInput.value
        console.log(inputValue)
        updateGuess()
        updateBoard()
        checkWord()
        cleanInput()
        console.log(boardEL)
    }
}

if(submitButton){
    submitButton.addEventListener('click', submit)
}
else{
    console.log("submit button not found")
}

resetButton.addEventListener('click', init)