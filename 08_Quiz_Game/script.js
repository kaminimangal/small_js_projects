const quizData = [
    {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    correct: 1
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    correct: 2
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
    correct: 3
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correct: 0
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    correct: 1
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1905", "1915", "1920"],
    correct: 0
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
    correct: 1
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Which coding language is known for use in web development?",
    options: ["Python", "C++", "Java", "JavaScript"],
    correct: 3
  },
  {
    question: "What is the freezing point of water?",
    options: ["0°C", "100°C", "-10°C", "32°C"],
    correct: 0
  },
]

let currentQuestion = 0;
let score = 0;


const page = document.querySelector('.container')
const quizApp = document.querySelector('#quiz-app')

const loadQuiz = ()=>{
    displayQuesAns()
}

const displayQuesAns = () => {
    quizApp.innerHTML = `
    <h3>Progress : Question : ${(currentQuestion+1)}/${quizData.length}</h3>
    <div class="progress-container">
        
        <div class="progress-fill" style="width : ${((currentQuestion+1)/quizData.length)*100}%"></div>
    </div>
    <h2>${quizData[currentQuestion].question}</h2>
    
    <div class="options">
        ${quizData[currentQuestion].options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}  </label>
        `).join('')}
    </div>

    <button id="submit">Submit</button>
    `;
    
    // Now we need to make that button work...
    
    const submitBtn = document.querySelector('#submit')
    
        submitBtn.addEventListener('click',nextQuestion)

}

const nextQuestion = () => {
    // 1. Get the selected input NOW (at the moment of clicking)
    const selectedBtn = document.querySelector('input[name="answer"]:checked');
    
    // GUARD: If nothing selected, stop
    if (!selectedBtn) {
        alert("Please select an answer!");
        return;
    }

    // 2. Check Score
    // Convert string value "0" to number 0
    const answerIndex = parseInt(selectedBtn.value);
    
    if (answerIndex === quizData[currentQuestion].correct) {
        score++; // Add point!
    }
    const index = quizData[currentQuestion].correct;
    console.log(quizData[currentQuestion]['options'][index])
    // 3. Move Logic
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuesAns();
    } else {
        showResults();
    }
}

const showResults = () => {
    quizApp.innerHTML = `
        <h2>Quiz Completed! 🎉</h2>
        <h3>Your Score: ${score} / ${quizData.length}</h3>
        <button id="restart">Restart</button>
    `;
    // Attach listener via JS
    document.getElementById('restart').addEventListener('click', restartQuiz);
}

const restartQuiz = ()=>{
    score = 0;
    currentQuestion = 0;
    loadQuiz()
}

loadQuiz()
