// Global variables to store references to DOM elements and game states
let submitButton;
let randomizedWord;
let guesses = 6;

// Word List
const words = [
  "APPLE",
  "BRAVE",
  "CRAZY",
  "DANCE",
  "EAGLE",
  "FLAME",
  "GRAPE",
  "HAPPY",
  "IVORY",
  "JOLLY",
  "KNEEL",
  "LUCKY",
  "MAGIC",
  "NOBLE",
  "OCEAN",
  "PROUD",
  "QUEEN",
  "RAVEN",
  "SHINY",
  "TIGER",
  "UNCLE",
  "VIVID",
  "WHALE",
  "YACHT",
  "ZEBRA",
  "ADORE",
  "BINGO",
  "CANDY",
  "DELTA",
  "ELBOW",
  "FROST",
  "GLORY",
  "HORSE",
  "INDIA",
  "JOKER",
  "KNIFE",
  "LEMON",
  "METER",
  "NORTH",
  "ORBIT",
  "PIANO",
  "QUAKE",
  "RAINY",
  "SIREN",
  "TRUST",
  "URBAN",
  "VITAL",
  "WITTY",
  "YIELD",
  "ZESTY",
  "AMBER",
  "BOOST",
  "CRAFT",
  "DWARF",
  "EAGER",
  "FABLE",
  "GRILL",
  "HOUSE",
  "IDEAL",
  "JUMPY",
  "KARMA",
  "LARGE",
  "MODEL",
  "NOVEL",
  "OXIDE",
  "POINT",
  "QUILT",
  "RISKY",
  "STORK",
  "TOAST",
  "UNION",
  "VOCAL",
  "WATER",
  "YOUNG",
  "ZESTY",
  "ARROW",
  "BLADE",
  "CHARM",
  "DREAM",
  "ELITE",
  "FANCY",
  "GIANT",
  "HONOR",
  "INPUT",
  "JAZZY",
  "KNEAD",
  "LIGHT",
  "MARCH",
  "PEACE",
  "PLANT",
  "QUICK",
  "RIVER",
  "STACK",
  "STONE",
  "SWIFT",
  "TULIP",
  "VALOR",
];

// DOM element references
let userInput = document.querySelector("#input");
submitButton = document.querySelector(".submit");
const boardEL = document.querySelectorAll(".sqr");
const row = document.querySelectorAll("row");
let guessEL = document.querySelector(".guess");
const resetButton = document.querySelector(".reset");
const jsConfetti = new JSConfetti();

// Open modal functionality
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const errorModal = document.getElementById("error-modal");
const errorMessage = document.getElementById("error-message");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".error-modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".error-modal");
    closeModal(modal);
  });
});

// Open a modal
function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Close a modal
function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Initialized the game state
function init() {
  boardEL.forEach((element) => {
    element.textContent = "";
    element.style.backgroundColor = "";
  });
  const rows = document.querySelectorAll(".row");
  if (rows.length > 1) {
    rows.forEach(() => {
      rows[1].remove();
    });
  }
  userInputValue = "";
  guesses = 7;
  clearWord();
  updateGuess();
  cleanInput();
  randomWord();
}

// Choose a random word from the word list
function randomWord() {
  randomizedWord = words[Math.floor(Math.random() * words.length)];
}

// Update the game board with user's guess
function updateBoard() {
  const userInputValue = userInput.value.toUpperCase();
  const letters = userInputValue.split("");
  const rows = document.querySelectorAll(".row");
  const currentRow = rows[rows.length - 2];
  squares = currentRow.querySelectorAll(".sqr");
  squares.forEach((square, index) => {
    square.textContent = letters[index];
  });
  boardEL.forEach((element, index) => {});
}

// Clear the word from the board
function clearWord() {
  boardEL.forEach((element) => {
    element.textContent = "";
    element.style.backgroundColor = "";
  });
}

// Reveal the word after all the guesses are used
function reveal() {
  if (guesses === 0) {
    let wordReveal = document.getElementById("word-reveal");
    wordReveal.textContent = `The word was: ${randomizedWord}`;
    wordReveal.style.color = "green";
    wordReveal.classList.add("active");
  }
}

// Clear the word from the input so the user can guess again 
function cleanInput() {
  let input = document.getElementById("input");
  input.value = "";
}

// Check if the user's guess matches the random word
function checkWord() {
  const randomizedLetters = randomizedWord.split("");
  const row = document.querySelectorAll(".row");
  const currentRow = row[row.length - 2];
  const squares = currentRow.querySelectorAll(".sqr");
  let isCorrect = true;
  squares.forEach((element, index) => {
    const letter = element.textContent;
    if (letter === randomizedLetters[index]) {
      element.style.backgroundColor = "green";
    } else if (randomizedLetters.includes(letter)) {
      element.style.backgroundColor = "yellow";
      isCorrect = false;
    } else {
      element.style.backgroundColor = "grey";
      isCorrect = false;
    }
  });

  if (isCorrect) {
    guessEL.textContent = "YOU GUESSED IT";
    guessEL.style.color = "green";
    jsConfetti.addConfetti({
      emojis: [randomizedLetters],
      confettiRadius: 0.2,
      confettiNumber: 100,
    });
  } else {
  }
}

// Update the number of guesses and manage confetti effect
function updateGuess() {
  guessEL.textContent = `Guesses: ${guesses}`;
  if (guesses > 0) {
    guesses = guesses - 1;
    guessEL.textContent = `Guesses: ${guesses}`;
  }
  if (guesses === 0) {
    guessEL.textContent = `GAME OVER`;
    guessEL.style.color = "red";

    reveal();
    jsConfetti.addConfetti({
      confettiColors: ["#FF0000", "#FF4500", "#DC143C", "#B22222", "#8B0000"],
      confettiRadius: 6,
      confettiNumber: 100,
    });

    return;
  }
}

// Create and append a new row
function createNewRow() {
  const boardContainer = document.getElementById("board-container");
  const row = document.createElement("div");
  row.classList.add("row");

  for (i = 0; i < 5; i++) {
    const square = document.createElement("div");
    square.classList.add("sqr");
    square.textContent = "";
    row.appendChild(square);
  }
  boardContainer.append(row);
}

// Open error modal
function showErrorModal(message) {
  errorMessage.textContent = message;
  openModal(errorModal);
}

// Handle the submit functionality
function submit() {
  if (guesses === 0) {
    return;
  }
  let inputValue = userInput.value;
  let myPattern = /^[A-Z]+$/i;
  if (inputValue === "") {
    showErrorModal("Please enter a word.");
    return;
  } else if (inputValue.length < 5 || inputValue.length > 5) {
    showErrorModal("Please enter a 5-letter word");
  } else if (myPattern.test(inputValue) === false) {
    showErrorModal(
      "Please enter letters only. No special characters or numbers"
    );
  } else {
    createNewRow();
    updateGuess();
    updateBoard();
    checkWord();
    cleanInput();
  }
}

// Event listener for the Enter button
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submit();
  }
});

// Validation to check if the submit button has been clicked
if (submitButton) {
  submitButton.addEventListener("click", submit);
}

// Event listener for the reset button
resetButton.addEventListener("click", () => {
  location.reload();
});

// Call the init function on page load
init();
