let questions = 

[{
    prompt: 'What does HTML stand for?',
    options: [
        "HyperText Machine Language",
        "HyperText Marking Language",
        "HyperText Markup Language",
        "HyperLink Main Language",
    ],
    answer: "HyperText Markup Language"
},

{
    prompt: 'Which of the following tag is used for inserting the largest heading in HTML?',
    options: [
        "head",
        "<h1>",
        "<h6>",
        "heading",
    ],
    answer:"<h1>"
},

{
    prompt: 'In which part of the HTML metadata is contained?',
    options:[
        "head tag",
        "title tag",
        "html tag",
        "body tag",
    ],
    answer:"head tag"
},

{
    prompt: 'Which element is used for or styling HTML5 layout?',
    options:[
        "CSS",
        "jQuery",
        "JavaScript",
        "PHP",
    ],
    answer:"CSS"

 },
];

let questionsEl = document.querySelector ("#questions");
let timerEl = document.querySelector("#timer");
let choiceslistEl = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start")
let nameEl = document.querySelector("#names")
let feedbackEl = document.querySelector("#feedback")
let restartBtnEl = document.querySelector("#restart")

let CurrentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

function StartQuiz() {
    timerId = setInterval(
        clockTick, 
        1000
    );

timerEl.textContent = time;
let startScreenEl = document.getElementById ("start-screen");
startScreenEl.setAttribute ( "class", "hide");

questionsEl.removeAttribute("class");
getQuestion();

}

function getQuestion(){
    let currentQuestion = questions[CurrentQuestionIndex];
    let promptEl = document.getElementById ("sentence");
    promptEl.textContent = currentQuestion.prompt;
    choiceslistEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.onclick = questionClick;
            choiceslistEl.appendChild(choiceBtn);
        }
    );
}

function questionClick () {
    if (
        this.value !== questions [CurrentQuestionIndex] .answer
    ) {
        time-=10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong!';
        feedbackEl.color = "red";
    } else{
        feedbackEl.textContent = "correct!";
        feedbackEl.color = "green";
    }
    feedbackEl.setAttribute (
        "class", "feedback"
    );
    setTimeout (function () {
        feedbackEl.setAttribute ("class", "feedback hide")
    }, );
    CurrentQuestionIndex++;
    if (
        CurrentQuestionIndex === questions.length
    ) {
        quizEnd ();
    } else {
        getQuestion();
    }

}

function quizEnd(){
    clearInterval(timerId);
    let endScreenEl = document.getElementById ("end-quiz");
    endScreenEl.removeAttribute ("class");
    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute ("class", "hide");
}

function clockTick(){
    time--;
    timerEl.textContent = time;
    if (time <= 0 ) {
        quizEnd();
    }
}

function saveHighScore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse (window.localStorage.getItem ("highscores")) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push (newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    
    alert(
        "Your Score will be reviwed soon"
    );
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
        alert(
            "your score will be reviwed soon"
        );
    }
}
nameEl.onclick = checkForEnter;
submitBtn.onclick = saveHighScore;
startBtn.onclick = StartQuiz;