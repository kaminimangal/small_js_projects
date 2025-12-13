const emojis = ['🐱', '🐱', '🐶', '🐶', '🦆', '🦆', '🐸', '🐸', '🦁', '🦁', '🐷', '🐷', '🐵', '🐵', '🦄', '🦄'];

const matches = document.querySelector('#matches')
const moves = document.getElementById('moves')

const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('reset');

let numMoves = 0;
let numMatches = 0;

let flippedCards = [];

// ... variables ...

const initGame = () => {
    // 1. Reset Variables
    numMoves = 0;
    numMatches = 0;
    flippedCards = []; // Safety clear
    
    // 2. Reset UI Text
    moves.textContent = numMoves;
    matches.textContent = `${numMatches} / 8`;

    // 3. Clear Board
    gameBoard.innerHTML = ''; // 1. CLEAR the board first!
    
    let myArray = [...emojis];
    myArray.sort(() => Math.random() - 0.5);

    myArray.forEach((emo) => {
        const btn = document.createElement('button');
        btn.classList.add('card'); // Add the CSS class for styling!
        btn.textContent = '?';
        btn.dataset.secretName = emo; // Store the secret
        
        // FIX: Add the listener RIGHT HERE
        btn.addEventListener('click', flipCard);
        
        gameBoard.appendChild(btn);
    });
};

// Update flipCard to read the secret
const flipCard = (e) => {
    const clickedBtn = e.target;
    
    // GUARD 1: If we are already checking 2 cards, ignore clicks (stop the user)
    if (flippedCards.length === 2) return;

    // GUARD 2: If the card is already flipped (prevent double-clicking same card)
    if (clickedBtn.classList.contains('flipped')) return;
    
    // VISUAL: Change the text to show the emoji
    clickedBtn.textContent = clickedBtn.dataset.secretName;
    clickedBtn.classList.add('flipped'); 

    flippedCards.push(clickedBtn);

    if(flippedCards.length === 2){
        checkMatch();
    }
};

const checkMatch = () => {
    const [cardOne, cardTwo] = flippedCards;

    // Increment Moves
    numMoves++;
    moves.textContent = numMoves;

    if(cardOne.dataset.secretName === cardTwo.dataset.secretName){
        // MATCH!
        // Add a 'matched' class so they stay green/visible
        cardOne.classList.add('matched');
        cardTwo.classList.add('matched');
        
        // Reset the array immediately so user can click next pair
        flippedCards = []; 
        
        // Increment Score
        numMatches++;
        matches.textContent = `${numMatches} / 8`;

        // Check Win Condition
        if (numMatches === 8) {
            setTimeout(() => alert(`You won in ${numMoves} moves!`), 500);
        }

    } else {
        // NO MATCH!
        // Wait 1 second so user can see the cards
        setTimeout(() => {
            cardOne.textContent = '?';
            cardTwo.textContent = '?';
            cardOne.classList.remove('flipped');
            cardTwo.classList.remove('flipped');
            
            // Reset array AFTER the timeout
            flippedCards = []; 
        }, 1000);
    }
}

resetBtn.addEventListener('click', initGame);

// Call it once to start the game
initGame();