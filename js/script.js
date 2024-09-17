let questions = [];
const askBtn = document.getElementById('ask-btn');
const answerBtn = document.getElementById('answer-btn');
const correctBtn = document.getElementById('correct-btn');
const reviewBtn = document.getElementById('review-btn');
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const correctCountDiv = document.getElementById('correct-count');
const reviewedQuestionsDiv = document.getElementById('reviewed-questions');
const allQuestionsBtn = document.getElementById('all-questions-btn');
const allQuestionsAnswersBtn = document.getElementById('all-questions-answers-btn');

// New elements for "Write Answer" and "Run Python Code" functionality
const writeAnswerBtn = document.getElementById('write-answer-btn');
const openEditorBtn = document.getElementById('open-editor-btn');
const answerTextarea = document.getElementById('answer-textarea');
const codeTextarea = document.getElementById('code');  // Python code textarea
const tutorFrame = document.getElementById('tutorFrame');  // Python Tutor iframe

let currentQuestion = null;
let lastQuestion = null;  // To track the last question shown
let correctCount = 0;
let reviewedQuestions = [];

// Initially hide the Python code textarea and iframe
codeTextarea.style.display = 'none';
tutorFrame.style.display = 'none';

// Fetch questions from the JSON file
fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
        questionDiv.innerHTML = `<strong>Error:</strong> Unable to fetch questions at this time.`;
    });

// Show a random question when "Ask Question" is clicked
askBtn.addEventListener('click', () => {
    if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        questionDiv.innerHTML = `<strong>Question:</strong> ${currentQuestion.question}`;
        answerDiv.innerHTML = ''; // Clear previous answer
        answerTextarea.style.display = 'none';  // Hide textarea when a new question is asked
        answerTextarea.value = '';  // Clear the textarea

        // Hide Python code editor and iframe
        codeTextarea.style.display = 'none';
        tutorFrame.style.display = 'none';
    } else {
        questionDiv.innerHTML = '<strong>Error:</strong> No questions available.';
    }
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

// Show all questions when "Show All Questions" is clicked
allQuestionsBtn.addEventListener('click', () => {
    if (questions.length > 0) {
        const allQuestionsHtml = questions.map(q => `<li>${q.question}</li>`).join('');
        questionDiv.innerHTML = `<strong>All Questions:</strong><ul>${allQuestionsHtml}</ul>`;
        answerDiv.innerHTML = ''; // Clear previous answers
    } else {
        questionDiv.innerHTML = '<strong>Error:</strong> No questions available.';
    }
});

// Show all questions with answers when "Show All Questions with Answers" is clicked
allQuestionsAnswersBtn.addEventListener('click', () => {
    if (questions.length > 0) {
        const allQuestionsAnswersHtml = questions.map(q => {
            const answersHtml = q.answers.map(answer => `<pre>${escapeHtml(answer)}</pre>`).join('<hr>');
            return `<li><strong>${q.question}</strong><br>${answersHtml}</li>`;
        }).join('<hr>');  // Join questions with a separator (optional)
        
        questionDiv.innerHTML = `<strong>All Questions with Answers:</strong><ul>${allQuestionsAnswersHtml}</ul>`;
        answerDiv.innerHTML = ''; // Clear previous answers
    } else {
        questionDiv.innerHTML = '<strong>Error:</strong> No questions available.';
    }
});

// Show the textarea when "Write Answer" button is clicked
writeAnswerBtn.addEventListener('click', () => {
    answerTextarea.style.display = 'block';  // Display the textarea
});

// Show the Python code editor and iframe when "Run Python Code" button is clicked
openEditorBtn.addEventListener('click', () => {
    codeTextarea.style.display = 'block';  // Show the Python code textarea
    tutorFrame.style.display = 'block';  // Show the Python Tutor iframe
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
