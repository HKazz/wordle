let submitButton
let randomizedWord
let guesses = 6
const words = [
    "APPLE", "BRAVE", "CRAZY", "DANCE", "EAGLE", "FLAME", "GRAPE", "HAPPY", "IVORY", "JOLLY",
    "KNEEL", "LUCKY", "MAGIC", "NOBLE", "OCEAN", "PROUD", "QUEEN", "RAVEN", "SHINY", "TIGER",
    "UNCLE", "VIVID", "WHALE", "YACHT", "ZEBRA", "ADORE", "BINGO", "CANDY", "DELTA",
    "ELBOW", "FROST", "GLORY", "HORSE", "INDIA", "JOKER", "KNIFE", "LEMON", "METER", "NORTH",
    "ORBIT", "PIANO", "QUAKE", "RAINY", "SIREN", "TRUST", "URBAN", "VITAL", "WITTY", "YIELD",
    "ZESTY", "AMBER", "BOOST", "CRAFT", "DWARF", "EAGER", "FABLE", "GRILL", "HOUSE", "IDEAL",
    "JUMPY", "KARMA", "LARGE", "MODEL", "NOVEL", "OXIDE", "POINT", "QUILT", "RISKY", "STORK",
    "TOAST", "UNION", "VOCAL", "WATER", "YOUNG", "ZESTY", "ARROW", "BLADE", "CHARM", "DREAM",
    "ELITE", "FANCY", "GIANT", "HONOR", "INPUT", "JAZZY", "KNEAD", "LIGHT", "MARCH", "PEACE",
    "PLANT", "QUICK", "RIVER", "STACK", "STONE", "SWIFT", "TULIP", "VALOR"
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
    const userInputValue = userInput.value.toUpperCase(); 
    const boardContainer = document.getElementById('board-container')
    const currentRow = boardContainer.lastElementChild
    const squares = currentRow.querySelectorAll('sqr')
  
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
    // needs work
    if(guesses ===  0){
        alert("game over.")
        guessEL.textContent = `Guesses: ${guesses}`
        console.log(`The word is ${randomizedWord}`)
        return
    }
    else{
        guesses = guesses - 1
        guessEL.textContent = `Guesses: ${guesses}`
        return
    }

}

function createNewRow(){
    const boardContainer = document.getElementById('board-container')
    if(!boardContainer){
        console.error('board container not found')
        return
    }
    const newRow = document.createElement('div')
    newRow.classList.add('row')
    
    for(let i = 0; i < 5; i++){
        const square = document.createElement('div')
        square.classList.add('sqr')
        square.textContent = ''
        newRow.appendChild(square)
    }
    boardContainer.appendChild(newRow)
    
}


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
        createNewRow()
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