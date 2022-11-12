//DOM elements 
var timer = document.querySelector("#time");
var questions = document.querySelector("#questions");
var feedback = document.querySelector("#feedback");
var choices = document.querySelector("choices");
var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit");
var intials = document.querySelector("#intials");

//quiz variables
// var questionIndex = 0;
var time = length * 60;
var timerId;

//start quiz function
function startQuiz() {
var startScreen = document.getElementById("start-screen");
startScreen.setAttribute("class", "hide");

//unhide questions
questions.removeAttribute("class");

//start timer
timerId = setInterval(1000);

//starting time
timer.textContent = time;

getQuestion()
};