document.addEventListener("DOMContentLoaded", function () {
  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-btn");
  let currentQuestionIndex = 0;
  let quizData = [];
  let score = 0;

  fetch("http://localhost:3000/quiz_data.json")
    .then((response) => response.json())
    .then((data) => {
      quizData = data;
      showQuestion(currentQuestionIndex);
    })
    .catch((error) => console.error("Error fetching quiz data:", error));

  function showQuestion(index) {
    const currentQuestion = quizData[index];
    if (currentQuestion) {
      const questionHTML = `
          <h2>${currentQuestion.question}</h2>
          <form id="quiz-form">
            ${currentQuestion.options
              .map(
                (option, optionIndex) => `
              <label>
                <input type="radio" name="answer" value="${optionIndex}">
                ${option}
              </label><br>
            `
              )
              .join("")}
          </form>
        `;
      questionContainer.innerHTML = questionHTML;
    } else {
      questionContainer.innerHTML = `Score: ${score}`;
      nextButton.disabled = true;
    }
  }

  questionContainer.addEventListener("change", function (event) {
    const selectedAnswerIndex = event.target.value; // Get the value of the selected answer
    if (selectedAnswerIndex !== null) {
      const selectedAnswer = parseInt(selectedAnswerIndex);
      const currentQuestion = quizData[currentQuestionIndex];
      // Check if the selected answer is correct
      if (selectedAnswer === currentQuestion.correctIndex) {
        console.log("Correct answer!");
      } else {
        console.log(
          "Wrong answer. The correct answer is:",
          currentQuestion.options[currentQuestion.correctIndex]
        );
      }
    }
  });

  nextButton.addEventListener("click", function () {
    const selectedAnswerIndex = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedAnswerIndex) {
      const selectedAnswer = parseInt(selectedAnswerIndex.value);
      const currentQuestion = quizData[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correctIndex) {
        score++;
      }

      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      alert("Please select an answer.");
    }
  });
});
