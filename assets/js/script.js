// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

function startQuiz() {
  // hide intro
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // populate questions
  questionsEl.removeAttribute("class");

  // timer start
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

// get questions function
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clears answers
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // allows button click
    choiceNode.onclick = questionClick;

    // displays question
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // checks for wrong answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // takes time off clock if incorrect answer
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    
    timerEl.textContent = time;
    feedbackEl.textContent = "Sorry, that was incorrect!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";
  }

  // shows right or wrong response
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // moves to next question
  currentQuestionIndex++;

  // checks time
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // timer stop
  clearInterval(timerId);

  // end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hides questions 
  questionsEl.setAttribute("class", "hide");
}

// function to see if user ran out of time 
function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

// save highscore function
function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // shows saved scores
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    // input new score
    var newScore = {
      score: time,
      initials: initials
    };

    // localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to highscore page
    window.location.href = "highscore.html";
  }
}

// save high score function
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials button
submitBtn.onclick = saveHighscore;

// start quiz button
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;