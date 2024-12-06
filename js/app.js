let submitButton
const words = []

const userInput = document.querySelector('#input')
submitButton = document.querySelector('.submit')
const board = document.querySelectorAll('.board')

console.log(userInput)
console.log(submitButton)
console.log(board)

function updateBoard(){
    board.textContent = userInput
}

function submit(){
    console.log(userInput)
    updateBoard()
    console.log(board)
}


submitButton.addEventListener('click', submit)

