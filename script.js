"use strict";

let currentQuestion = 0;
let quizData = [];

// Load quiz data from JSON
async function loadQuiz() {
  try {
    const res = await fetch("quiz.json");
    quizData = await res.json();
    showQuestion();
  } catch (error) {
    document.getElementById("quiz").innerHTML = "<h2>Failed to load quiz data.</h2>";
  }
}

// Display current question and answers
function showQuestion() {
  deselectAnswers();

  const current = quizData[currentQuestion];
  document.getElementById("question").innerText = current.question;

  const answers = ["a", "b", "c", "d"];
  answers.forEach((key) => {
    const input = document.getElementById(key);
    const label = input.nextElementSibling; // the <span> is next to input
    label.nextSibling.textContent = current[key]; // set the text after <span>
  });
}

// Uncheck all radio buttons
function deselectAnswers() {
  document.querySelectorAll(".custom-radio input").forEach((el) => el.checked = false);
}

// Get the selected answer
function getSelected() {
  let selected;
  document.querySelectorAll(".custom-radio input").forEach((el) => {
    if (el.checked) selected = el.id;
  });
  return selected;
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", () => {
  const answer = getSelected();

  if (!answer) {
    alert("Please select an answer");
    return;
  }

  if (answer === quizData[currentQuestion].correct) {
    alert("Correct!");
  } else {
    alert("Wrong answer!");
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").innerHTML = "<h2>Quiz completed!</h2>";
  }
});

loadQuiz();
