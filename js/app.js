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
const row = document.querySelectorAll('row')
let guessEL = document.querySelector('.guess')
const resetButton = document.querySelector('.reset')


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const errorModal = document.getElementById('error-modal')
const errorMessage = document.getElementById('error-message')


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

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.error-modal.active')
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

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.error-modal')
        closeModal(modal)
    })
});

function reveal(){
    if(guesses === 0){
        let wordReveal = document.getElementById('word-reveal')
        wordReveal.textContent = `The word was: ${randomizedWord}`
        wordReveal.style.color = 'green'
        console.log(wordReveal)
        wordReveal.classList.add('active')
    }
}

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
    boardEL.forEach(element => {
        element.textContent = ''
        element.style.backgroundColor = ''
    })

    const rows = document.querySelectorAll('.row')

    if(rows.length > 1){
        rows.forEach( ()=>{
            rows[1].remove()
        })
    }

    userInputValue = ''
    console.log('initialization complete')
    console.log(rows.length)
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

function updateBoard(){
    const userInputValue = userInput.value.toUpperCase()
    const letters = userInputValue.split('')
    const rows = document.querySelectorAll('.row')
    const currentRow = rows[rows.length - 2]
    squares = currentRow.querySelectorAll('.sqr')

    squares.forEach((square, index) => {
        square.textContent = letters[index]
        console.log(square)
    })

    boardEL.forEach((element, index) => {
        console.log(`${index}: ${element.textContent}`)
    })
}
// writes only on the first row
// function updateBoard() {
//     const userInputValue = userInput.value.toUpperCase(); 
//     const boardContainer = document.getElementById('board-container')
//     const currentRow = boardContainer.lastElementChild
//     const squares = currentRow.querySelectorAll('sqr')
  
//     clearWord();
//       const letters = userInputValue.split('');
//       letters.forEach((letter, index) => {
//         boardEL[index].textContent = letter
//         return
//       });
//       boardEL.forEach((element, index) => {
//         console.log(`${index}: ${element.textContent}`)
//       })
//     }
  
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
}

 function checkWord(){
    const randomizedLetters = randomizedWord.split('')
    const row = document.querySelectorAll('.row')
    const currentRow = row[row.length - 2]
    const squares = currentRow.querySelectorAll('.sqr') 
    let isCorrect = true
    squares.forEach((element, index) => {
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
        guessEL.textContent = 'YOU GUESSED IT'
        guessEL.style.color = 'green'
        // add confetti
    }
    else{
        console.log('THE WORD IS WRONG')
    }
}

function updateGuess(){
    guessEL.textContent = `Guesses: ${guesses}`
    // needs work
    if(guesses >  0){
        guesses = guesses - 1
        guessEL.textContent = `Guesses: ${guesses}`
    }
    if(guesses === 0){
        
        guessEL.textContent = `GAME OVER`
        guessEL.style.color = 'red'
        console.log(`The word is ${randomizedWord}`)
        reveal()
        console.log(randomizedWord)
        return   
    }

}

function createNewRow(){
    const boardContainer = document.getElementById('board-container')
    console.log(boardContainer)

    const row = document.createElement('div')
    row.classList.add('row')
    console.log(row)

    for(i=0; i < 5; i++){
        const square = document.createElement('div')
        console.log(square)
        square.classList.add('sqr')
        square.textContent = ''
        console.log(square)
        row.appendChild(square)
    }
    boardContainer.append(row)
}

function showErrorModal(message){
    errorMessage.textContent = message
    openModal(errorModal)
}


function submit(){
    if(guesses === 0){
        return
    }
    let inputValue = userInput.value
    let myPattern = /^[A-Z]+$/i
    if (inputValue === '') {
        showErrorModal('Please enter a word.');
        return;
    }
    else if(inputValue.length < 5 || inputValue.length > 5){
        showErrorModal('Please enter a 5-letter word')

    }
    else if(myPattern.test(inputValue) === false){
        showErrorModal("Please enter letters only. No special characters or numbers")
    }
    else{
        console.log(inputValue)
        createNewRow()
        updateGuess()
        updateBoard()
        checkWord()
        cleanInput()
        console.log(boardEL)
    }
}

userInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault()
        submit()
    }
})

if(submitButton){
    submitButton.addEventListener('click', submit)
}
else{
    console.log("submit button not found")
}

resetButton.addEventListener('click', () =>{
    location.reload();
})