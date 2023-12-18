var questions = [
    {
        text: "How do you create an array?",
        answers: [
            "Copy and paste",
            "Object.assign()",
            "Using spread paramenter"
        ],
        correctIndex: 1,
    },
    {
        text: "2. What is a true/false variable?",
        answers: [
            "integer",
            "boolean",
            "array"
        ],
        correctIndex: 1,
    },
    {
        text: "3. How do you add an element to an array?",
        answers: [
            "array.add",
            "array.append",
            "array.plus"
        ],
        correctIndex: 1,
    },
    {
        text: "4. How do you referfence an HTML elemnt?",
        answers: [
            "Copy and paste",
            "document.querySelec",
            "pointers"
        ],
        correctIndex: 1,
    },
    {
        text: "5. What is a valid javascript library",
        answers: [
            "Lightning",
            "JQuery",
            "fastCode"
        ],
        correctIndex: 1,
    },
];

var allHighScores = [
    {
        rank: "1.",
        initials: "",
        score: 0,
    },
    {
        rank: "2.",
        initials: "",
        score: 0,
    },
    {
        rank: "3.",
        initials: "",
        score: 0,
    },
    
]

//Selectors
var startBtn = document.querySelector("#btnStartQuiz");
var quizSection = document.querySelector("#quiz");
var startSection = document.querySelector("#start")
var timeLeft = document.querySelector("#timeLeft");
var questionText = document.querySelector("#question-text");
var questionAnswers = document.querySelector("#question-answers");
var scoreSection = document.querySelector("#score");
var acceptButton = document.querySelector("#accept");
var playerInitals = document.querySelector("#initials");
var highScoreSection = document.querySelector("#highScore");

//Initial values for game
var totalTimeLeft = 75;
var penaltyTime = 10;
var questionIndex = 0;
var quizInterval;
var totalCorrect = 0;
var gameStarted = false;
var clickedAnswerIndex;

function displayTimeLeft(){
   
    timeLeft.textContent = totalTimeLeft;
    totalTimeLeft--;
}

function displayNextQuestion(){
         questionAnswers.innerHTML = "";
        console.log(totalCorrect);
        var question = questions[questionIndex];
        questionText.textContent = question.text;
    
      for (var x = 0; x < question.answers.length; x++){
            var answer = question.answers[x];
            var liEl =  document.createElement("li");
            liEl.textContent = answer;
            liEl.setAttribute("data-index", x);
            questionAnswers.appendChild(liEl);
            questionAnswers.setAttribute("data-correct-answer", question.correctIndex);
      }
   
    

}

function endGame(){
    gameStarted = false;
}
function checkAnswer(answerIndex) {
    var currentQuestion = questions[questionIndex];
    if (currentQuestion.correctIndex === parseInt(answerIndex)) {
        totalCorrect++;
    }
    else {
        totalTimeLeft -= penaltyTime;
    }
}

function answerClickHandler(event) {
    if (event.target.matches("li") ){
        questionIndex++;
        if (totalTimeLeft && questionIndex < questions.length){
        var clickedAnswerIndex = event.target.dataset.index;
        checkAnswer(clickedAnswerIndex);
       
        displayNextQuestion();
    }
    else {
        showScore();
    }
    }
}



function showScore(){
    console.log("Score: ", totalCorrect);
    console.log("Time Left: ", totalTimeLeft);
    quizSection.style.display = "none";
    scoreSection.style.display = "flex";
    var score = totalCorrect;
    var liEl =  document.createElement("li");
            liEl.textContent = score;
            scoreSection.appendChild(liEl);
    

}

function quizIntervalFunction(){
    if (totalTimeLeft > 0 && questionIndex < questions.length){
        displayTimeLeft();
    }
    else{
        clearInterval(quizInterval);
    }
}

function startQuiz() {
    gameStarted = true;
    startSection.style.display = "none";
    quizSection.style.display = "flex";
    displayNextQuestion();
    var quizInterval = setInterval(quizIntervalFunction, 1000)
}

function init(){
    startBtn.addEventListener("click", startQuiz);
    questionAnswers.addEventListener("click", answerClickHandler);
}

acceptButton.addEventListener("click", function(event){
    event.preventDefault();
    scoreSection.style.display = "none";
    highScoreSection.style.display = "flex";

    for (var y = 0; y < allHighScores.length; y++)
        if (totalCorrect >= allHighScores.score[y]){
            allHighScores.score[y] = totalCorrect;
            allHighScores.initials[y] = playerInitals;
            break;
        }

    localStorage.setItem("allHighScores", JSON.stringify(allHighScores));
    renderScores();

});

function renderScores() {
    var retrieveHighScores = JSON.parse(localStorage.getItem("allHighScores"));
    if (retrieveHighScores !== null){
        document.querySelector("#highScoreArea").textContent = allHighScores.initials + "Score: " + allHighScores.score;
    }

}

init();
