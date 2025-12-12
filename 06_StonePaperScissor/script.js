// 1. Select Elements
const myScoreEl = document.getElementById('myScore');
const compScoreEl = document.getElementById('compScore');
const btns = document.querySelectorAll('.btns button');
const resultDisplay = document.querySelector('.resultDisplay');
const resetBtn = document.getElementById('reset');

// 2. Game State variables
const choices = ['rock', 'paper', 'scissor'];
let playerScore = 0;
let compScore = 0;

// 3. Computer Logic
const getComputerChoice = () => {
    const num = Math.floor(Math.random() * 3); // Simple 0-2 random
    return choices[num];
}

// 4. Referee Logic
const isPlayerWinner = (player, computer) => {
    if (player === computer) return 'tie';
    
    if (player === 'rock') {
        return (computer === 'scissor') ? 'win' : 'lose';
    }
    if (player === 'scissor') {
        return (computer === 'paper') ? 'win' : 'lose';
    }
    if (player === 'paper') {
        return (computer === 'rock') ? 'win' : 'lose';
    }
}

// 5. Game Loop
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // FIX 1: Use .id to avoid getting the Emoji text
        const myChoice = btn.id; 
        const compChoice = getComputerChoice();
        const result = isPlayerWinner(myChoice, compChoice);

        // FIX 2: Update the logic and colors based on result
        if (result === 'win') {
            playerScore++; // Add point
            resultDisplay.innerHTML = `You: ${myChoice} vs Comp: ${compChoice} <br> <span style="color:green">🎉 You Won!</span>`;
        } else if (result === 'lose') {
            compScore++;   // Add point
            resultDisplay.innerHTML = `You: ${myChoice} vs Comp: ${compChoice} <br> <span style="color:red">😢 You Lost!</span>`;
        } else {
            resultDisplay.innerHTML = `You: ${myChoice} vs Comp: ${compChoice} <br> <span style="color:orange">🤝 It's a Tie!</span>`;
        }

        // FIX 3: Actually update the HTML numbers
        myScoreEl.textContent = playerScore;
        compScoreEl.textContent = compScore;
    })
});

// 6. Reset Logic
resetBtn.addEventListener('click', () => {
    playerScore = 0;
    compScore = 0;
    myScoreEl.textContent = 0;
    compScoreEl.textContent = 0;
    resultDisplay.textContent = "Choose your move!";
});