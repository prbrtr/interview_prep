let questions = [];
const askBtn = document.getElementById('ask-btn');
const answerBtn = document.getElementById('answer-btn');
const correctBtn = document.getElementById('correct-btn');
const reviewBtn = document.getElementById('review-btn');
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const correctCountDiv = document.getElementById('correct-count');
const reviewedQuestionsDiv = document.getElementById('reviewed-questions');

let currentQuestion = null;
let correctCount = 0;
let reviewedQuestions = [];

// Fetch questions from the JSON file
fetch('data/questions.json') // Adjust path if necessary
    .then(response => response.json())
    .then(data => {
        questions = data;
    });

// Show a random question when "Ask" is clicked
askBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    questionDiv.innerHTML = `<strong>Question:</strong> ${currentQuestion.question}`;
    answerDiv.innerHTML = ''; // Clear the answer
});

// Show the answers when "Answer" is clicked
answerBtn.addEventListener('click', () => {
    if (currentQuestion) {
        const answersHtml = currentQuestion.answers.map(answer => `<div><strong>Answer:</strong><pre>${answer}</pre></div>`).join('<hr>');
        answerDiv.innerHTML = answersHtml;
    } else {
        answerDiv.innerHTML = 'Please click "Ask" to get a question first!';
    }
});

// Increment correct count when "Correct" is clicked
correctBtn.addEventListener('click', () => {
    if (currentQuestion && !reviewedQuestions.includes(currentQuestion.question)) {
        correctCount++;
        correctCountDiv.innerHTML = `Correct Answers: ${correctCount}`;
    }
});

// Save the current question for review when "Review" is clicked
reviewBtn.addEventListener('click', () => {
    if (currentQuestion && !reviewedQuestions.includes(currentQuestion.question)) {
        reviewedQuestions.push(currentQuestion.question);
        reviewedQuestionsDiv.innerHTML = `Reviewed Questions:<br>${reviewedQuestions.map(q => `<li>${q}</li>`).join('')}`;
    }
});
