const words = {
    "batab": "Gobernante de un batabil, con funciones administrativas, judiciales y militares",
    "batabil": "Unidad territorial bajo la jurisdicción de un batab",
    "cuchabal": "Provincia maya gobernada por un Halach Uinic",
    "cuchteel": "Unidad territorial básica dentro de un cuchabal, compuesta por familias extensas",
    "multepal": "Sistema de gobierno confederado, donde el poder era compartido entre varias familias gobernantes",
    "tzucub": "Institución que agrupaba linajes gobernantes",
    "almehen": "Noble de linaje distinguido",
    "nacom": "Jefe militar o sacerdote",
    "ajaw": "Dentro de los mayas, la autoriadad se depositaba en bajo el título de ajaw y abarca también a todos los miembros de la casta gobernante. Sin embargozfue hasta finales del siglo IV, los supremos gobernantes se destinguían de la clase señorial haciéndose llamar K'uhul ajaw, o Señor Divino ",
    "kaloomte": "El título kaloomte' (conocido por mucho tiempo como Batab) fue de suma importancia y se restringió a las dinastías más poderosas del Clásico. Cuando se anteponía el prefijo ochk'inm 'oeste', se elegaba su legitimidad como proveniente de Teotihuacán.",
};

let selectedWord = Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
let guessedLetters = [];
let attempts = 6;

const wordDisplay = document.getElementById("word-display");
const lettersDiv = document.getElementById("letters");
const message = document.getElementById("message");
const attemptsSpan = document.getElementById("attempts");
const modal = document.getElementById("word-info-modal");
const wordTitle = document.getElementById("word-title");
const wordMeaning = document.getElementById("word-meaning");
const closeModal = document.querySelector(".close");

modal.style.display = "none";


const correctSound = new Audio("https://luummaaya.neocities.org/Sonidos/correct.mp3");
const wrongSound = new Audio("https://luummaaya.neocities.org/Sonidos/wrong.mp3");
const winSound = new Audio("https://luummaaya.neocities.org/Sonidos/win.mp3");
const loseSound = new Audio("https://luummaaya.neocities.org/Sonidos/lose.mp3");

const fireworksContainer = document.createElement("div");
fireworksContainer.id = "fireworks-container";
document.body.appendChild(fireworksContainer);




// Display underscores for the word
function updateWordDisplay() {
    wordDisplay.textContent = selectedWord.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_").join(" ");
}

// Create letter buttons
function createLetterButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => handleGuess(letter, btn);
        lettersDiv.appendChild(btn);
    });
}

// Handle letter guess
function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        btn.classList.add("correct");
        correctSound.play();
    } else {
        attempts--;
        attemptsSpan.textContent = attempts;
        btn.classList.add("wrong");
        wrongSound.play();
    }
    checkGameStatus();
    updateWordDisplay();
}

// Check if player won or lost
function checkGameStatus() {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        message.textContent = "Ganaste";
        showWordInfo();
        lettersDiv.innerHTML = "";
        winSound.play();
        startFireworks();
    } else if (attempts === 0) {
        message.textContent = `Perdiste. La palabre era "${selectedWord}"`;
        loseSound.play();
        showWordInfo();
        lettersDiv.innerHTML = "";

    }
}

// Show word information in modal
function showWordInfo() {
    wordTitle.textContent = `Palabra: ${selectedWord}`;
    wordMeaning.textContent = words[selectedWord];
    modal.style.display = "flex";
}

// 🎆 Fireworks effect
function startFireworks() {
    fireworksContainer.style.display = "block";

    let count = 0;
    const interval = setInterval(() => {
        if (count > 5) {
            clearInterval(interval);
            fireworksContainer.style.display = "none";
        } else {
            createFirework();
        }
        count++;
    }, 500);
}

// Create a single firework
function createFirework() {
    const firework = document.createElement("div");
    firework.style.position = "absolute";
    firework.style.width = "10px";
    firework.style.height = "10px";
    firework.style.backgroundColor = getRandomColor();
    firework.style.borderRadius = "50%";
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 100}%`;
    firework.style.opacity = "1";
    firework.style.transition = "opacity 1s ease-out";

    fireworksContainer.appendChild(firework);

    setTimeout(() => {
        firework.style.opacity = "0";
        setTimeout(() => firework.remove(), 1000);
    }, 500);
}

// Get a random color for fireworks
function getRandomColor() {
    const colors = ["red", "blue", "yellow", "green", "orange", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}



// Restart the game
function restartGame() {
    modal.style.display = "none";
    selectedWord = Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
    guessedLetters = [];
    attempts = 6;
    message.textContent = "";
    attemptsSpan.textContent = attempts;
    lettersDiv.innerHTML = "";
    updateWordDisplay();
    createLetterButtons();
}

// Close modal when clicking 'X'
closeModal.onclick = () => {
    modal.style.display = "none";
};

// Initialize game
updateWordDisplay();
createLetterButtons();