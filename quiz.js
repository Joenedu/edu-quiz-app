document.addEventListener("DOMContentLoaded", () => {
  const outputDivEl = document.querySelector("#output");
  const fetchBtn = document.querySelector("#fetchBtn");
  const questionSizeEl = document.querySelector("#question-size");
  const difficultyLevelEl = document.querySelector("#difficulty-level");
  const categoryEl = document.querySelector("#category");

  let questionSize = 0;
  let difficultyLevel = "";
  let category = 0;
  let QUIZ_API = `https://opentdb.com/api.php?amount=${questionSize}&category=${category}&difficulty=${difficultyLevel}&type=multiple`;

  outputDivEl.textContent = `Document Ready State: ${document.readyState}`;

  questionSizeEl.addEventListener("input", (e) => {
    questionSize = parseInt(e.target.value);
    updateURLParams();
  });

  categoryEl.addEventListener("change", (e) => {
    category = parseInt(e.target.value);
    updateURLParams();
  });

  difficultyLevelEl.addEventListener("change", (e) => {
    difficultyLevel = e.target.value;
    updateURLParams();
  });

  function updateURLParams() {
    QUIZ_API = `https://opentdb.com/api.php?amount=${questionSize}&category=${category}&difficulty=${difficultyLevel}&type=multiple`;
  }

  questionSize && alert(questionSize);

  async function fetchData(api_url) {
    const response = await fetch(api_url);
    if (!response.ok) return;
    const responseObj = await response.json();
    return responseObj.results;
  }

  //Call the fetchData function on button click and renderOutput
  fetchBtn.addEventListener("click", () => {
    const quizData = fetchData(QUIZ_API);
    renderOutput(quizData);
  });

  // Render output function
  function renderOutput(data) {
    let questions = (outputDivEl.textContent = "Loading...");

    data.then((quizObjArr) => {
      outputDivEl.textContent = "";

      for (let quizObj of quizObjArr) {
        console.log(quizObj);
        
        let ul = document.createElement("ul");
        const p = document.createElement("p");

        p.classList.add("questions");
        p.innerHTML += `${quizObj.question}`;

        const correctAnswer = quizObj.correct_answer;
        const incorrectAnswers = quizObj.incorrect_answers;

        for (let incorrectAnswer of incorrectAnswers) {
          const li = document.createElement("li");
          li.textContent = incorrectAnswer;

          ul.appendChild(li);
        }
        outputDivEl.appendChild(p);
        outputDivEl.appendChild(ul);
      }
    });
  }
});
