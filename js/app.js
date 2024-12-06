let submitButton
const words = []

const userInput = document.querySelector('#input')
submitButton = document.querySelector('.submit')
const board = document.querySelectorAll('.board')


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

