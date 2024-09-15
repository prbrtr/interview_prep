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
let lastQuestion = null;  // To track the last question shown
let correctCount = 0;
let reviewedQuestions = [];

// Fetch questions from the JSON file
fetch('data/questions.json') // Ensure this is the correct path
    .then(response => response.json())
    .then(data => {
        questions = data;
    });

// Show a random question when "Ask Question" is clicked
askBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    questionDiv.innerHTML = `<strong>Question:</strong> ${currentQuestion.question}`;
    answerDiv.innerHTML = ''; // Clear previous answer
});

// Show the answer when "Show Answer" is clicked
answerBtn.addEventListener('click', () => {
    if (currentQuestion) {
        const answersHtml = currentQuestion.answers.map(answer => `<pre>${escapeHtml(answer)}</pre>`).join('<hr>');
        answerDiv.innerHTML = answersHtml;
    } else {
        answerDiv.innerHTML = 'Please click "Ask Question" to get a question first!';
    }
});

// Mark correct when "Mark Correct" is clicked (only for new questions)
correctBtn.addEventListener('click', () => {
    if (currentQuestion && currentQuestion !== lastQuestion) {
        correctCount++;
        correctCountDiv.innerHTML = `Correct Answers: ${correctCount}`;
        lastQuestion = currentQuestion;  // Set last question as the current one
    }
});

// Review the current question when "Review Question" is clicked
reviewBtn.addEventListener('click', () => {
    if (currentQuestion && !reviewedQuestions.includes(currentQuestion.question)) {
        reviewedQuestions.push(currentQuestion.question);
        reviewedQuestionsDiv.innerHTML = `Reviewed Questions:<ul>${reviewedQuestions.map(q => `<li>${q}</li>`).join('')}</ul>`;
    }
});

// Function to escape HTML entities
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
