var devReset = document.getElementById('dev-reset');

var startButton = document.getElementById('start-btn');
var scoreButton = document.getElementById('score-btn');
var startContainerEl = document.getElementById('start-container');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var responseEl = document.getElementById('answer-response');
var scoreContainerEl = document.getElementById('score-container');
var infoContainerEl = document.getElementById('info-container');
var answerBtnsEl = document.getElementById('answer-btns');
var questionCountEl = document.getElementById('question-count');
var scoreEl = document.getElementById('player-score');




var startQuiz = function() {
    startContainerEl.classList.add('hidden');
    questionContainerEl.classList.remove('hidden');
    infoContainerEl.classList.remove('hidden');
    questionIndex = 0;
    playerScore = 0;
    setQuestion();
    questionTimer();
};



var resetQuiz = function() {
    startContainerEl.classList.remove('hidden');
    questionContainerEl.classList.add('hidden');
    infoContainerEl.classList.add('hidden');
    scoreContainerEl.classList.add('hidden');
};

var setQuestion = function() {
    if (questions[questionIndex]) {
        getQuestion(questions[questionIndex])
    }
    else {
        resetQuiz();
    }
}

var getQuestion = function(question) {
    questionEl.innerText = question.question;
    for (i = 0; i < question.answers.length; i++) {
        var answerBtnEl = document.createElement('button');
        answerBtnEl.className = 'btn';
        answerBtnEl.setAttribute("correct", question.answers[i].correct);
        answerBtnEl.innerText = question.answers[i].value;
        answerBtnsEl.appendChild(answerBtnEl);
        if (question.answers[i].correct) {
            answerBtnEl.dataset.correct = question.answers[i].correct;
        }
    }
    questionNumber = questionIndex + 1
    questionTotal = questions.length
    questionCountEl.innerHTML = `<div id='question-count'>Question: ${questionNumber}/${questionTotal} </div>`
};

var checkAnswer = function(event) {
    if (event.target.matches('.btn')) {
        var targetEl = event.target;
        var correct = targetEl.dataset.correct;
        if (correct) {
            console.log('Correct answer selected!');
            targetEl.classList.add('correct');
            responseEl.innerText = "Correct!";
            playerScore++;
            scoreEl.innerHTML = `<div id='question-timer'>Score: ${playerScore}</div>`
        }
        else {
            console.log('Wrong answer selected!');
            targetEl.classList.add('wrong');
            responseEl.innerText = "Wrong!";
            playerScore--;
            scoreEl.innerHTML = `<div id='question-timer'>Score: ${playerScore}</div>`
        }

        setTimeout(function() {
            questionIndex++
            clearQuestion();
            setQuestion();
        }, 1000)
    }
};

var clearQuestion = function() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild)
    }
};




var questions = [
    {
        question: "test question 1",
        answers: [
            { value: "Answer 1", correct: true },
            { value: "Answer 2", correct: false },
            { value: "Answer 3", correct: false },
            { value: "Answer 4", correct: false }
        ]
    },
    {
        question: "test question 2",
        answers: [
            { value: "Answer 1", correct: true },
            { value: "Answer 2", correct: false },
            { value: "Answer 3", correct: false },
            { value: "Answer 4", correct: false }
        ]
    },
    {
        question: "test question 3",
        answers: [
            { value: "Answer 1", correct: true },
            { value: "Answer 2", correct: false },
            { value: "Answer 3", correct: false },
            { value: "Answer 4", correct: false }
        ]
    },
    {
        question: "test question 4",
        answers: [
            { value: "Answer 1", correct: true },
            { value: "Answer 2", correct: false },
            { value: "Answer 3", correct: false },
            { value: "Answer 4", correct: false }
        ]
    }
]

startButton.addEventListener('click', startQuiz);
devReset.addEventListener('click', resetQuiz);
answerBtnsEl.addEventListener('click', checkAnswer);