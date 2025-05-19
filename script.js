"use strict";

let currentQuestion = 0;
let quizData = [];

async function loadQuiz() {
  try {
    const res = await fetch("quiz.json"); // Use a real URL if hosted remotely
    quizData = await res.json();
    showQuestion();
  } catch (error) {
    document.getElementById("quiz").innerHTML = "<h2>Failed to load quiz data.</h2>";
  }
}

function showQuestion() {
  deselectAnswers();

  const current = quizData[currentQuestion];
  document.getElementById("question").innerText = current.question;
  document.getElementById("a_text").innerText = current.a;
  document.getElementById("b_text").innerText = current.b;
  document.getElementById("c_text").innerText = current.c;
  document.getElementById("d_text").innerText = current.d;
}

function deselectAnswers() {
  document.querySelectorAll(".answer").forEach((el) => el.checked = false);
}

function getSelected() {
  let selected;
  document.querySelectorAll(".answer").forEach((el) => {
    if (el.checked) selected = el.id;
  });
  return selected;
}

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


